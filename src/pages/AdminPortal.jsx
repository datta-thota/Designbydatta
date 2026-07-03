import React, { useMemo, useState } from 'react';
import {
    Copy,
    Download,
    ExternalLink,
    Github,
    ImagePlus,
    Plus,
    RefreshCw,
    Rocket,
    Save,
    Trash2
} from 'lucide-react';
import { projects } from '../data/projects';
import { latestDesigns } from '../data/latestDesigns';
import { techProjects } from '../data/techProjects';
import './AdminPortal.css';

const STORAGE_KEY = 'datta-portfolio-admin-data';
const GITHUB_SETTINGS_KEY = 'datta-portfolio-github-settings';
const ADMIN_PASSPHRASE_HASH = '03df498e940e8e4ed4a268b7240007c0edd5c583465389fb441fd42bbda8b01e';
const MAX_UNLOCK_ATTEMPTS = 5;

const defaultGithubSettings = {
    owner: 'datta-thota',
    repo: 'Designbydatta',
    branch: 'main',
    token: '',
    commitMessage: 'Update portfolio data from admin portal'
};

const collectionConfig = {
    projects: {
        label: 'Design Projects',
        fileName: 'projects.js',
        exportName: 'projects',
        source: projects,
        emptyItem: {
            id: 0,
            slug: '',
            title: '',
            category: '',
            image: '',
            year: '',
            role: '',
            concept: '',
            process: '',
            gallery: []
        }
    },
    latestDesigns: {
        label: 'Latest Designs',
        fileName: 'latestDesigns.js',
        exportName: 'latestDesigns',
        source: latestDesigns,
        emptyItem: {
            id: 0,
            slug: '',
            title: '',
            image: '',
            gallery: [],
            description: '',
            date: ''
        }
    },
    techProjects: {
        label: 'Tech Projects',
        fileName: 'techProjects.js',
        exportName: 'techProjects',
        source: techProjects,
        emptyItem: {
            id: 0,
            title: '',
            description: '',
            tags: [],
            image: '',
            githubUrl: '',
            demoUrl: '#',
            features: [],
            techStack: []
        }
    }
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const getInitialData = () => {
    const defaults = Object.fromEntries(
        Object.entries(collectionConfig).map(([key, config]) => [key, clone(config.source)])
    );

    try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaults, ...JSON.parse(saved) } : defaults;
    } catch {
        return defaults;
    }
};

const slugify = (value) => value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const getNextId = (items) => {
    const maxId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0);
    return maxId + 1;
};

const createModuleCode = (collectionKey, items) => {
    const exportName = collectionConfig[collectionKey].exportName;
    return `export const ${exportName} = ${JSON.stringify(items, null, 4)};\n`;
};

const getInitialGithubSettings = () => {
    try {
        const saved = window.localStorage.getItem(GITHUB_SETTINGS_KEY);
        return saved ? { ...defaultGithubSettings, ...JSON.parse(saved), token: '' } : defaultGithubSettings;
    } catch {
        return defaultGithubSettings;
    }
};

const getPersistableGithubSettings = (settings) => {
    const persistableSettings = { ...settings };
    delete persistableSettings.token;
    return persistableSettings;
};

const encodeBase64 = (value) => {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
    });
    return window.btoa(binary);
};

const sha256 = async (value) => {
    const hashBuffer = await window.crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return Array.from(new Uint8Array(hashBuffer))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
};

const githubRequest = async (url, token, options = {}) => {
    const response = await fetch(url, {
        ...options,
        headers: {
            Accept: 'application/vnd.github+json',
            Authorization: `Bearer ${token}`,
            'X-GitHub-Api-Version': '2022-11-28',
            ...(options.headers || {})
        }
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new Error(errorBody.message || `GitHub request failed with ${response.status}`);
    }

    return response.json();
};

const commitDataFilesToGithub = async ({ data, settings }) => {
    const { owner, repo, branch, token, commitMessage } = settings;
    const baseUrl = `https://api.github.com/repos/${owner}/${repo}`;

    if (!owner || !repo || !branch || !token) {
        throw new Error('Add GitHub owner, repo, branch, and token before deploying.');
    }

    const ref = await githubRequest(`${baseUrl}/git/ref/heads/${branch}`, token);
    const latestCommit = await githubRequest(`${baseUrl}/git/commits/${ref.object.sha}`, token);

    const tree = await Promise.all(
        Object.entries(collectionConfig).map(async ([key, config]) => {
            const blob = await githubRequest(`${baseUrl}/git/blobs`, token, {
                method: 'POST',
                body: JSON.stringify({
                    content: encodeBase64(createModuleCode(key, data[key] || [])),
                    encoding: 'base64'
                })
            });

            return {
                path: `src/data/${config.fileName}`,
                mode: '100644',
                type: 'blob',
                sha: blob.sha
            };
        })
    );

    const newTree = await githubRequest(`${baseUrl}/git/trees`, token, {
        method: 'POST',
        body: JSON.stringify({
            base_tree: latestCommit.tree.sha,
            tree
        })
    });

    const newCommit = await githubRequest(`${baseUrl}/git/commits`, token, {
        method: 'POST',
        body: JSON.stringify({
            message: commitMessage || defaultGithubSettings.commitMessage,
            tree: newTree.sha,
            parents: [ref.object.sha]
        })
    });

    await githubRequest(`${baseUrl}/git/refs/heads/${branch}`, token, {
        method: 'PATCH',
        body: JSON.stringify({
            sha: newCommit.sha
        })
    });

    return newCommit;
};

const Field = ({ label, value, onChange, type = 'text', multiline = false, placeholder = '' }) => (
    <label className="admin-field">
        <span>{label}</span>
        {multiline ? (
            <textarea
                value={value || ''}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                rows={5}
            />
        ) : (
            <input
                type={type}
                value={value || ''}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
            />
        )}
    </label>
);

const ListEditor = ({ title, items = [], onChange, placeholder = 'Add item' }) => {
    const updateItem = (index, value) => {
        const next = [...items];
        next[index] = value;
        onChange(next);
    };

    const removeItem = (index) => onChange(items.filter((_, itemIndex) => itemIndex !== index));

    return (
        <section className="admin-editor-section">
            <div className="admin-section-title">
                <h3>{title}</h3>
                <button type="button" onClick={() => onChange([...items, ''])} className="admin-icon-button">
                    <Plus size={16} />
                </button>
            </div>
            <div className="admin-stack">
                {items.map((item, index) => (
                    <div className="admin-inline-row" key={`${title}-${index}`}>
                        <input
                            value={item || ''}
                            onChange={(event) => updateItem(index, event.target.value)}
                            placeholder={placeholder}
                        />
                        <button type="button" onClick={() => removeItem(index)} className="admin-icon-button danger">
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

const GalleryEditor = ({ collectionKey, gallery = [], onChange }) => {
    const isProjectGallery = collectionKey === 'projects';

    const addItem = () => {
        onChange([...gallery, isProjectGallery ? { image: '', caption: '' } : '']);
    };

    const updateItem = (index, key, value) => {
        const next = [...gallery];
        if (isProjectGallery) {
            next[index] = { ...next[index], [key]: value };
        } else {
            next[index] = value;
        }
        onChange(next);
    };

    const removeItem = (index) => onChange(gallery.filter((_, itemIndex) => itemIndex !== index));

    return (
        <section className="admin-editor-section">
            <div className="admin-section-title">
                <h3>Gallery</h3>
                <button type="button" onClick={addItem} className="admin-icon-button">
                    <ImagePlus size={16} />
                </button>
            </div>
            <div className="admin-gallery-editor">
                {gallery.map((item, index) => {
                    const imageValue = isProjectGallery ? item?.image : item;
                    const captionValue = isProjectGallery ? item?.caption : '';

                    return (
                        <div className="admin-gallery-row" key={`gallery-${index}`}>
                            <div className="admin-preview small">
                                {imageValue ? <img src={imageValue} alt="" /> : <ImagePlus size={22} />}
                            </div>
                            <div className="admin-gallery-fields">
                                <input
                                    value={imageValue || ''}
                                    onChange={(event) => updateItem(index, isProjectGallery ? 'image' : null, event.target.value)}
                                    placeholder="Image URL"
                                />
                                {isProjectGallery && (
                                    <input
                                        value={captionValue || ''}
                                        onChange={(event) => updateItem(index, 'caption', event.target.value)}
                                        placeholder="Caption"
                                    />
                                )}
                            </div>
                            <button type="button" onClick={() => removeItem(index)} className="admin-icon-button danger">
                                <Trash2 size={16} />
                            </button>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

const TechStackEditor = ({ items = [], onChange }) => {
    const updateItem = (index, key, value) => {
        const next = [...items];
        next[index] = { ...next[index], [key]: value };
        onChange(next);
    };

    return (
        <section className="admin-editor-section">
            <div className="admin-section-title">
                <h3>Tech Stack</h3>
                <button type="button" onClick={() => onChange([...items, { name: '', tools: '' }])} className="admin-icon-button">
                    <Plus size={16} />
                </button>
            </div>
            <div className="admin-stack">
                {items.map((item, index) => (
                    <div className="admin-inline-row two-column" key={`stack-${index}`}>
                        <input
                            value={item.name || ''}
                            onChange={(event) => updateItem(index, 'name', event.target.value)}
                            placeholder="Name"
                        />
                        <input
                            value={item.tools || ''}
                            onChange={(event) => updateItem(index, 'tools', event.target.value)}
                            placeholder="Tools"
                        />
                        <button
                            type="button"
                            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
                            className="admin-icon-button danger"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

const AdminPortal = () => {
    const [data, setData] = useState(getInitialData);
    const [githubSettings, setGithubSettings] = useState(getInitialGithubSettings);
    const [activeCollection, setActiveCollection] = useState('projects');
    const [selectedId, setSelectedId] = useState(data.projects[0]?.id || null);
    const [status, setStatus] = useState('');
    const [jsonError, setJsonError] = useState('');
    const [isDeploying, setIsDeploying] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [passphrase, setPassphrase] = useState('');
    const [authError, setAuthError] = useState('');
    const [failedAttempts, setFailedAttempts] = useState(0);

    const items = useMemo(() => data[activeCollection] || [], [data, activeCollection]);
    const selectedItem = useMemo(
        () => items.find((item) => item.id === selectedId) || items[0] || null,
        [items, selectedId]
    );

    const selectCollection = (key) => {
        setActiveCollection(key);
        setSelectedId((data[key] || [])[0]?.id || null);
        setJsonError('');
    };

    const updateCollection = (nextItems) => {
        setData((current) => ({ ...current, [activeCollection]: nextItems }));
    };

    const updateSelected = (field, value) => {
        updateCollection(items.map((item) => (
            item.id === selectedItem.id ? { ...item, [field]: value } : item
        )));
    };

    const addItem = () => {
        const nextId = getNextId(items);
        const newItem = {
            ...clone(collectionConfig[activeCollection].emptyItem),
            id: nextId,
            title: `New ${collectionConfig[activeCollection].label}`,
            slug: `new-${nextId}`
        };

        const nextItems = [...items, newItem];
        updateCollection(nextItems);
        setSelectedId(nextId);
    };

    const duplicateItem = () => {
        if (!selectedItem) return;
        const nextId = getNextId(items);
        const duplicated = {
            ...clone(selectedItem),
            id: nextId,
            title: `${selectedItem.title || 'Untitled'} Copy`,
            slug: selectedItem.slug ? `${selectedItem.slug}-copy-${nextId}` : `copy-${nextId}`
        };
        updateCollection([...items, duplicated]);
        setSelectedId(nextId);
    };

    const deleteItem = () => {
        if (!selectedItem) return;
        const nextItems = items.filter((item) => item.id !== selectedItem.id);
        updateCollection(nextItems);
        setSelectedId(nextItems[0]?.id || null);
    };

    const updateGithubSetting = (field, value) => {
        setGithubSettings((current) => ({ ...current, [field]: value }));
    };

    const saveDraft = async () => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        window.localStorage.setItem(GITHUB_SETTINGS_KEY, JSON.stringify(getPersistableGithubSettings(githubSettings)));

        if (!githubSettings.token) {
            setStatus('Saved in this browser. Add a GitHub token to deploy.');
            return;
        }

        setIsDeploying(true);
        setStatus('Creating GitHub commit...');

        try {
            const commit = await commitDataFilesToGithub({ data, settings: githubSettings });
            setStatus(`Deployed: ${commit.sha.slice(0, 7)} pushed to ${githubSettings.branch}`);
        } catch (error) {
            setStatus(`Deploy failed: ${error.message}`);
        } finally {
            setIsDeploying(false);
        }
    };

    const resetCollection = () => {
        const source = clone(collectionConfig[activeCollection].source);
        setData((current) => ({ ...current, [activeCollection]: source }));
        setSelectedId(source[0]?.id || null);
        setStatus(`${collectionConfig[activeCollection].fileName} restored`);
    };

    const copyCode = async () => {
        const code = createModuleCode(activeCollection, items);
        await navigator.clipboard.writeText(code);
        setStatus(`${collectionConfig[activeCollection].fileName} copied`);
    };

    const downloadCode = () => {
        const config = collectionConfig[activeCollection];
        const blob = new Blob([createModuleCode(activeCollection, items)], { type: 'text/javascript' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = config.fileName;
        link.click();
        URL.revokeObjectURL(url);
        setStatus(`${config.fileName} downloaded`);
    };

    const updateContentJson = (value) => {
        try {
            const parsed = value.trim() ? JSON.parse(value) : [];
            updateSelected('content', parsed);
            setJsonError('');
        } catch (error) {
            setJsonError(error.message);
        }
    };

    const unlockAdmin = async (event) => {
        event.preventDefault();

        if (failedAttempts >= MAX_UNLOCK_ATTEMPTS) {
            setAuthError('Too many attempts. Refresh the page to try again.');
            return;
        }

        const normalizedPassphrase = passphrase.trim().toLowerCase().replace(/\s+/g, ' ');
        const passphraseHash = await sha256(normalizedPassphrase);

        if (passphraseHash !== ADMIN_PASSPHRASE_HASH) {
            const nextAttempts = failedAttempts + 1;
            setFailedAttempts(nextAttempts);
            setAuthError(
                nextAttempts >= MAX_UNLOCK_ATTEMPTS
                    ? 'Too many attempts. Refresh the page to try again.'
                    : 'Passphrase does not match.'
            );
            return;
        }

        setIsUnlocked(true);
        setAuthError('');
        setFailedAttempts(0);
    };

    const renderEditor = () => {
        if (!selectedItem) {
            return <div className="admin-empty">No entries yet.</div>;
        }

        return (
            <div className="admin-editor">
                <div className="admin-editor-main">
                    <div className="admin-form-grid">
                        <Field label="Title" value={selectedItem.title} onChange={(value) => updateSelected('title', value)} />
                        {activeCollection !== 'techProjects' && (
                            <Field label="Slug" value={selectedItem.slug} onChange={(value) => updateSelected('slug', slugify(value))} />
                        )}
                        {activeCollection === 'projects' && (
                            <>
                                <Field label="Category" value={selectedItem.category} onChange={(value) => updateSelected('category', value)} />
                                <Field label="Year" value={selectedItem.year} onChange={(value) => updateSelected('year', value)} />
                                <Field label="Role" value={selectedItem.role} onChange={(value) => updateSelected('role', value)} />
                            </>
                        )}
                        {activeCollection === 'latestDesigns' && (
                            <Field label="Date" value={selectedItem.date} onChange={(value) => updateSelected('date', value)} />
                        )}
                        {activeCollection === 'techProjects' && (
                            <>
                                <Field label="GitHub URL" value={selectedItem.githubUrl} onChange={(value) => updateSelected('githubUrl', value)} />
                                <Field label="Demo URL" value={selectedItem.demoUrl} onChange={(value) => updateSelected('demoUrl', value)} />
                            </>
                        )}
                    </div>

                    <Field label="Image URL" value={selectedItem.image} onChange={(value) => updateSelected('image', value)} placeholder="https://..." />

                    {activeCollection === 'projects' && (
                        <>
                            <Field label="Concept" value={selectedItem.concept} onChange={(value) => updateSelected('concept', value)} multiline />
                            <Field label="Process" value={selectedItem.process} onChange={(value) => updateSelected('process', value)} multiline />
                            <GalleryEditor
                                collectionKey={activeCollection}
                                gallery={selectedItem.gallery || []}
                                onChange={(value) => updateSelected('gallery', value)}
                            />
                            <section className="admin-editor-section">
                                <div className="admin-section-title">
                                    <h3>Flexible Content JSON</h3>
                                </div>
                                <textarea
                                    value={JSON.stringify(selectedItem.content || [], null, 2)}
                                    onChange={(event) => updateContentJson(event.target.value)}
                                    rows={10}
                                />
                                {jsonError && <p className="admin-error">{jsonError}</p>}
                            </section>
                        </>
                    )}

                    {activeCollection === 'latestDesigns' && (
                        <>
                            <Field label="Description" value={selectedItem.description} onChange={(value) => updateSelected('description', value)} multiline />
                            <GalleryEditor
                                collectionKey={activeCollection}
                                gallery={selectedItem.gallery || []}
                                onChange={(value) => updateSelected('gallery', value)}
                            />
                        </>
                    )}

                    {activeCollection === 'techProjects' && (
                        <>
                            <Field label="Description" value={selectedItem.description} onChange={(value) => updateSelected('description', value)} multiline />
                            <ListEditor title="Tags" items={selectedItem.tags || []} onChange={(value) => updateSelected('tags', value)} placeholder="React" />
                            <ListEditor title="Features" items={selectedItem.features || []} onChange={(value) => updateSelected('features', value)} placeholder="Feature" />
                            <TechStackEditor items={selectedItem.techStack || []} onChange={(value) => updateSelected('techStack', value)} />
                        </>
                    )}
                </div>

                <aside className="admin-preview-panel">
                    <div className="admin-preview">
                        {selectedItem.image ? <img src={selectedItem.image} alt={selectedItem.title} /> : <ImagePlus size={32} />}
                    </div>
                    <div>
                        <h2>{selectedItem.title || 'Untitled'}</h2>
                        <p>{selectedItem.category || selectedItem.date || selectedItem.description || 'Preview'}</p>
                    </div>
                    {selectedItem.image && (
                        <a href={selectedItem.image} target="_blank" rel="noreferrer" className="admin-link-button">
                            <ExternalLink size={16} />
                            Open image
                        </a>
                    )}
                </aside>
            </div>
        );
    };

    if (!isUnlocked) {
        return (
            <main className="admin-page admin-lock-page">
                <form className="admin-lock-card" onSubmit={unlockAdmin}>
                    <p className="admin-kicker">Private Portal</p>
                    <h1>Admin Access</h1>
                    <Field
                        label="Passphrase"
                        type="password"
                        value={passphrase}
                        onChange={setPassphrase}
                        placeholder="Enter access line"
                    />
                    {authError && <p className="admin-error">{authError}</p>}
                    {failedAttempts > 0 && failedAttempts < MAX_UNLOCK_ATTEMPTS && (
                        <p className="admin-lock-note">
                            {MAX_UNLOCK_ATTEMPTS - failedAttempts} attempts remaining
                        </p>
                    )}
                    <button type="submit" disabled={failedAttempts >= MAX_UNLOCK_ATTEMPTS}>
                        <Save size={17} />
                        Unlock
                    </button>
                </form>
            </main>
        );
    }

    return (
        <main className="admin-page">
            <header className="admin-header">
                <div>
                    <p className="admin-kicker">Portfolio Data</p>
                    <h1>Admin Portal</h1>
                </div>
                <div className="admin-actions">
                    <button type="button" onClick={saveDraft} disabled={isDeploying}>
                        {githubSettings.token ? <Rocket size={17} /> : <Save size={17} />}
                        {isDeploying ? 'Deploying...' : 'Save'}
                    </button>
                    <button type="button" onClick={copyCode}>
                        <Copy size={17} />
                        Copy JS
                    </button>
                    <button type="button" onClick={downloadCode}>
                        <Download size={17} />
                        Download
                    </button>
                </div>
            </header>

            <section className="admin-tabs" aria-label="Data files">
                {Object.entries(collectionConfig).map(([key, config]) => (
                    <button
                        type="button"
                        key={key}
                        className={activeCollection === key ? 'active' : ''}
                        onClick={() => selectCollection(key)}
                    >
                        <span>{config.label}</span>
                        <strong>{data[key]?.length || 0}</strong>
                    </button>
                ))}
            </section>

            <section className="admin-github-panel">
                <div className="admin-github-title">
                    <Github size={20} />
                    <div>
                        <h2>GitHub Auto Deploy</h2>
                        <p>Save creates a commit with all files in src/data and pushes it to the selected branch.</p>
                    </div>
                </div>
                <div className="admin-github-grid">
                    <Field label="Owner" value={githubSettings.owner} onChange={(value) => updateGithubSetting('owner', value)} />
                    <Field label="Repo" value={githubSettings.repo} onChange={(value) => updateGithubSetting('repo', value)} />
                    <Field label="Branch" value={githubSettings.branch} onChange={(value) => updateGithubSetting('branch', value)} />
                    <Field
                        label="GitHub Token"
                        type="password"
                        value={githubSettings.token}
                        onChange={(value) => updateGithubSetting('token', value)}
                        placeholder="Fine-grained token with Contents read/write"
                    />
                    <label className="admin-field admin-field-wide">
                        <span>Commit Message</span>
                        <input
                            value={githubSettings.commitMessage}
                            onChange={(event) => updateGithubSetting('commitMessage', event.target.value)}
                        />
                    </label>
                </div>
            </section>

            <section className="admin-shell">
                <aside className="admin-sidebar">
                    <div className="admin-sidebar-top">
                        <div>
                            <h2>{collectionConfig[activeCollection].fileName}</h2>
                            <p>src/data</p>
                        </div>
                        <button type="button" onClick={addItem} className="admin-icon-button">
                            <Plus size={17} />
                        </button>
                    </div>

                    <div className="admin-list">
                        {items.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => setSelectedId(item.id)}
                                className={selectedItem?.id === item.id ? 'active' : ''}
                            >
                                <span>{item.title || `Entry ${item.id}`}</span>
                                <small>#{item.id}</small>
                            </button>
                        ))}
                    </div>

                    <div className="admin-sidebar-actions">
                        <button type="button" onClick={duplicateItem}>Duplicate</button>
                        <button type="button" onClick={resetCollection}>
                            <RefreshCw size={15} />
                            Reset
                        </button>
                        <button type="button" onClick={deleteItem} className="danger">
                            <Trash2 size={15} />
                            Delete
                        </button>
                    </div>
                </aside>

                {renderEditor()}
            </section>

            <footer className="admin-footer">
                <span>{status || 'Ready'}</span>
                <span>{collectionConfig[activeCollection].fileName}</span>
            </footer>
        </main>
    );
};

export default AdminPortal;

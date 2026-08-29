import React, { useEffect, useRef, useState } from 'react';
import { Search, X } from 'lucide-react';
import { Link } from '@inertiajs/react';

import { cn } from '@/lib/utils';

export interface FilterOption {
    id: string;
    label: string;
}

export interface SearchResult {
    id: string | number;
    title: string;
    category: string;
    image?: string;
    href: string;
}

interface ProjectsFilterBarProps {
    filters: FilterOption[];
    activeFilter: string;
    onFilterChange: (id: string) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
    searchResults: SearchResult[];
    resultCount: number;
    language: 'en' | 'ar';
}

export default function ProjectsFilterBar({
    filters,
    activeFilter,
    onFilterChange,
    searchQuery,
    onSearchChange,
    searchResults,
    resultCount,
    language,
}: ProjectsFilterBarProps): JSX.Element {
    const [searchFocused, setSearchFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!searchFocused) {
            return;
        }

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onSearchChange('');
                inputRef.current?.blur();
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [searchFocused, onSearchChange]);

    const showDropdown = searchFocused && searchQuery.trim().length > 0;

    return (
        <div className="projects-filter">
            <div className="projects-filter__inner">
                <div className="projects-filter__tabs">
                    {filters.map((filter) => (
                        <button
                            key={filter.id}
                            type="button"
                            className={cn('projects-filter__tab', activeFilter === filter.id && 'active')}
                            onClick={() => onFilterChange(filter.id)}
                            data-cursor-hover
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>

                <div className="projects-filter__right">
                    <div className="projects-filter__count">
                        {language === 'en' ? (
                            <>
                                Showing <span>{resultCount}</span> projects
                            </>
                        ) : (
                            <>
                                عرض <span>{resultCount}</span> مشروع
                            </>
                        )}
                    </div>

                    <div
                        className={cn('pf-search-bar', searchFocused && 'focused')}
                        data-cursor-hover
                    >
                        <Search className="h-3.5 w-3.5 shrink-0 opacity-60" />
                        <input
                            ref={inputRef}
                            type="text"
                            className="pf-search-bar__input"
                            placeholder={language === 'en' ? 'Search projects...' : 'بحث في المشاريع...'}
                            value={searchQuery}
                            onChange={(event) => onSearchChange(event.target.value)}
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setTimeout(() => setSearchFocused(false), 150)}
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                className="pf-search-bar__clear"
                                onClick={() => {
                                    onSearchChange('');
                                    inputRef.current?.focus();
                                }}
                                aria-label={language === 'en' ? 'Clear search' : 'مسح البحث'}
                            >
                                <X className="h-3 w-3" />
                            </button>
                        )}

                        {showDropdown && (
                            <div className="pf-search-bar__dropdown">
                                {searchResults.length > 0 ? (
                                    searchResults.map((result) => (
                                        <Link
                                            key={result.id}
                                            href={result.href}
                                            className="pf-search-bar__result"
                                            data-cursor-hover
                                        >
                                            {result.image && (
                                                <div className="pf-search-bar__result-img">
                                                    <img src={result.image} alt="" />
                                                </div>
                                            )}
                                            <div className="pf-search-bar__result-info">
                                                <div className="pf-search-bar__result-title">{result.title}</div>
                                                <div className="pf-search-bar__result-meta">
                                                    <span className="pf-search-bar__result-cat">{result.category}</span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="pf-search-bar__empty">
                                        {language === 'en' ? (
                                            <>
                                                No results for <strong>{searchQuery}</strong>
                                            </>
                                        ) : (
                                            <>
                                                لا توجد نتائج لـ <strong>{searchQuery}</strong>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

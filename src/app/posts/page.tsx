'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { getPosts } from '@/lib/data';
import { BlogPost } from '@/types/blog';

type SortOption = 'date-desc' | 'date-asc' | 'title-asc' | 'title-desc';

export default function PostsList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState<SortOption>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [previewPost, setPreviewPost] = useState<BlogPost | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const postsPerPage = 5;

  useEffect(() => {
    const allPosts = getPosts();
    setPosts(allPosts);
    
    // 获取所有标签
    const tags = Array.from(new Set(allPosts.flatMap(post => post.tags)));
    setAllTags(tags);
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  // 排序功能
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortOption) {
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });

  const openPreview = useCallback((post: BlogPost) => {
    setPreviewPost(post);
    setIsPreviewVisible(true);
  }, []);

  const closePreview = useCallback(() => {
    setIsPreviewVisible(false);
    setTimeout(() => setPreviewPost(null), 300); // 等待动画完成
  }, []);

  const navigatePreview = useCallback((direction: 'prev' | 'next') => {
    if (!previewPost) return;

    const currentIndex = sortedPosts.findIndex(post => post.id === previewPost.id);
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex > 0 ? currentIndex - 1 : sortedPosts.length - 1;
    } else {
      newIndex = currentIndex < sortedPosts.length - 1 ? currentIndex + 1 : 0;
    }

    openPreview(sortedPosts[newIndex]);
  }, [previewPost, sortedPosts, openPreview]);

  // 键盘事件处理
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!previewPost) return;

    switch (e.key) {
      case 'Escape':
        closePreview();
        break;
      case 'ArrowLeft':
        navigatePreview('prev');
        break;
      case 'ArrowRight':
        navigatePreview('next');
        break;
    }
  }, [previewPost, navigatePreview, closePreview]);

  // 点击外部关闭预览
  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      closePreview();
    }
  }, [closePreview]);

  const handlePreviewClick = useCallback((e: React.MouseEvent, post: BlogPost) => {
    e.preventDefault();
    openPreview(post);
  }, [openPreview]);

  useEffect(() => {
    if (previewPost) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [previewPost, handleKeyDown, handleClickOutside]);

  // 分页功能
  const totalPages = Math.ceil(sortedPosts.length / postsPerPage);
  const paginatedPosts = sortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
    setCurrentPage(1); // 重置页码
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
    setCurrentPage(1); // 重置页码
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">All Posts</h1>
        
        {/* 搜索和排序 */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // 重置页码
            }}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>

        {/* 标签筛选 */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Filter by Tags:</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid gap-6">
          {paginatedPosts.map((post) => (
            <article
              key={post.id}
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <Link 
                  href={`/posts/${post.slug}`}
                  onClick={(e) => handlePreviewClick(e, post)}
                  className="flex-1"
                >
                  <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600">
                    {post.title}
                  </h2>
                </Link>
                <button
                  onClick={(e) => handlePreviewClick(e, post)}
                  className="ml-4 px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                  aria-label={`Preview ${post.title}`}
                >
                  Preview
                </button>
              </div>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* 分页控件 */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <span className="px-4 py-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}

        {/* 无结果提示 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No posts found matching your criteria.
          </div>
        )}

        {/* 预览模态框 */}
        {previewPost && (
          <div 
            className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center p-4 z-50 ${
              isPreviewVisible ? 'bg-opacity-50' : 'bg-opacity-0'
            }`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="preview-title"
          >
            <div 
              ref={modalRef}
              className={`bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 ${
                isPreviewVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 id="preview-title" className="text-3xl font-bold">{previewPost.title}</h2>
                  <button
                    onClick={closePreview}
                    className="text-gray-500 hover:text-gray-700"
                    aria-label="Close preview"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <span>{previewPost.author}</span>
                  <span>•</span>
                  <span>{new Date(previewPost.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="prose max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{previewPost.content}</p>
                </div>
                <div className="flex gap-2 mt-6">
                  {previewPost.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigatePreview('prev')}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                      aria-label="Previous article"
                    >
                      ← Previous
                    </button>
                    <button
                      onClick={() => navigatePreview('next')}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-800"
                      aria-label="Next article"
                    >
                      Next →
                    </button>
                  </div>
                  <Link
                    href={`/posts/${previewPost.slug}`}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Read Full Article
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 
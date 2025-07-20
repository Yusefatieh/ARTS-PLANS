<?php
/**
 * Archive template for Floor Plans
 *
 * @package ArtsPlans
 */

get_header(); ?>

<main id="primary" class="site-main">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Page Header -->
        <div class="text-center mb-12">
            <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <?php _e('Floor Plans', 'artsplans'); ?>
            </h1>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                <?php _e('Discover professionally designed floor plans for homes, offices, and commercial spaces. Download high-quality architectural drawings ready for your projects.', 'artsplans'); ?>
            </p>
        </div>

        <!-- Filters and Search -->
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
            <div class="flex flex-col lg:flex-row gap-4 items-center">
                <!-- Search -->
                <div class="flex-1 w-full lg:w-auto">
                    <form method="get" class="relative">
                        <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                        <input type="text" name="s" value="<?php echo get_search_query(); ?>" 
                               placeholder="<?php _e('Search floor plans...', 'artsplans'); ?>"
                               class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <input type="hidden" name="post_type" value="floor_plan">
                    </form>
                </div>

                <!-- Category Filter -->
                <div class="w-full lg:w-auto">
                    <select name="design_category" onchange="filterByCategory(this.value)" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value=""><?php _e('All Categories', 'artsplans'); ?></option>
                        <?php 
                        $categories = get_terms(array(
                            'taxonomy' => 'design_category',
                            'hide_empty' => true,
                        ));
                        if ($categories && !is_wp_error($categories)):
                            foreach ($categories as $category): ?>
                                <option value="<?php echo esc_attr($category->slug); ?>" 
                                        <?php selected(get_query_var('design_category'), $category->slug); ?>>
                                    <?php echo esc_html($category->name); ?> (<?php echo $category->count; ?>)
                                </option>
                            <?php endforeach;
                        endif; ?>
                    </select>
                </div>

                <!-- Sort -->
                <div class="w-full lg:w-auto">
                    <select name="orderby" onchange="sortResults(this.value)" 
                            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option value="date"><?php _e('Newest First', 'artsplans'); ?></option>
                        <option value="title" <?php selected(get_query_var('orderby'), 'title'); ?>><?php _e('Alphabetical', 'artsplans'); ?></option>
                        <option value="meta_value_num" <?php selected(get_query_var('orderby'), 'meta_value_num'); ?>><?php _e('Most Downloaded', 'artsplans'); ?></option>
                        <option value="comment_count" <?php selected(get_query_var('orderby'), 'comment_count'); ?>><?php _e('Most Reviewed', 'artsplans'); ?></option>
                    </select>
                </div>
            </div>
        </div>

        <!-- Results Count and View Toggle -->
        <div class="flex justify-between items-center mb-6">
            <div class="text-gray-600">
                <?php
                global $wp_query;
                $total = $wp_query->found_posts;
                $current_page = max(1, get_query_var('paged'));
                $per_page = get_option('posts_per_page');
                $start = ($current_page - 1) * $per_page + 1;
                $end = min($start + $per_page - 1, $total);
                
                printf(
                    __('Showing %d-%d of %d floor plans', 'artsplans'),
                    $start,
                    $end,
                    $total
                );
                ?>
            </div>
            
            <div class="flex items-center space-x-2">
                <button onclick="setViewMode('grid')" id="grid-view" class="p-2 rounded-lg border border-gray-300 bg-blue-50 text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
                    </svg>
                </button>
                <button onclick="setViewMode('list')" id="list-view" class="p-2 rounded-lg border border-gray-300 hover:bg-gray-50">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                    </svg>
                </button>
            </div>
        </div>

        <!-- Floor Plans Grid -->
        <?php if (have_posts()): ?>
            <div id="floor-plans-container" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <?php while (have_posts()): the_post(); ?>
                    <article class="bg-white rounded-xl shadow-sm overflow-hidden card-hover border border-gray-200">
                        <?php if (has_post_thumbnail()): ?>
                            <div class="aspect-video bg-gray-200 relative group">
                                <a href="<?php the_permalink(); ?>">
                                    <?php the_post_thumbnail('artsplans-card', array('class' => 'w-full h-full object-cover group-hover:scale-105 transition-transform duration-300')); ?>
                                </a>
                                <div class="absolute top-3 right-3">
                                    <button class="w-8 h-8 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full flex items-center justify-center transition-all" 
                                            onclick="toggleFavorite(<?php echo get_the_ID(); ?>)"
                                            aria-label="<?php _e('Add to favorites', 'artsplans'); ?>">
                                        <svg class="w-4 h-4 text-gray-600 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        <?php endif; ?>
                        
                        <div class="p-6">
                            <div class="flex items-start justify-between mb-3">
                                <h3 class="font-semibold text-gray-900 text-lg leading-tight">
                                    <a href="<?php the_permalink(); ?>" class="hover:text-blue-600 transition-colors">
                                        <?php the_title(); ?>
                                    </a>
                                </h3>
                                <span class="text-lg font-bold text-blue-600">
                                    <?php echo artsplans_format_price(get_post_meta(get_the_ID(), '_artsplans_price', true)); ?>
                                </span>
                            </div>
                            
                            <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                                <?php echo wp_trim_words(get_the_excerpt(), 20); ?>
                            </p>
                            
                            <div class="flex items-center justify-between text-sm text-gray-500 mb-4">
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                    </svg>
                                    <?php echo artsplans_format_download_count(get_post_meta(get_the_ID(), '_artsplans_download_count', true)); ?>
                                </span>
                                <span class="flex items-center">
                                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <?php echo human_time_diff(get_the_time('U'), current_time('timestamp')) . ' ' . __('ago', 'artsplans'); ?>
                                </span>
                            </div>
                            
                            <div class="flex items-center justify-between">
                                <div class="flex items-center space-x-2">
                                    <?php 
                                    $terms = get_the_terms(get_the_ID(), 'design_category');
                                    if ($terms && !is_wp_error($terms)):
                                        $term = array_shift($terms); ?>
                                        <a href="<?php echo esc_url(get_term_link($term)); ?>" 
                                           class="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                            <?php echo esc_html($term->name); ?>
                                        </a>
                                    <?php endif; ?>
                                </div>
                                
                                <a href="<?php the_permalink(); ?>" 
                                   class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
                                    <?php _e('View Details', 'artsplans'); ?>
                                    <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </article>
                <?php endwhile; ?>
            </div>

            <!-- Pagination -->
            <div class="flex justify-center">
                <?php
                echo paginate_links(array(
                    'mid_size' => 2,
                    'prev_text' => __('&laquo; Previous', 'artsplans'),
                    'next_text' => __('Next &raquo;', 'artsplans'),
                    'class' => 'pagination',
                ));
                ?>
            </div>
        <?php else: ?>
            <!-- No Results -->
            <div class="text-center py-16">
                <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.195-5.5-3M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    <?php _e('No floor plans found', 'artsplans'); ?>
                </h3>
                <p class="text-gray-600 mb-6">
                    <?php _e('Try adjusting your search criteria or browse all categories.', 'artsplans'); ?>
                </p>
                <a href="<?php echo esc_url(get_post_type_archive_link('floor_plan')); ?>" 
                   class="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <?php _e('View All Floor Plans', 'artsplans'); ?>
                </a>
            </div>
        <?php endif; ?>
    </div>
</main>

<script>
function filterByCategory(category) {
    const url = new URL(window.location);
    if (category) {
        url.searchParams.set('design_category', category);
    } else {
        url.searchParams.delete('design_category');
    }
    url.searchParams.delete('paged');
    window.location.href = url.toString();
}

function sortResults(orderby) {
    const url = new URL(window.location);
    url.searchParams.set('orderby', orderby);
    if (orderby === 'meta_value_num') {
        url.searchParams.set('meta_key', '_artsplans_download_count');
    }
    url.searchParams.delete('paged');
    window.location.href = url.toString();
}

function setViewMode(mode) {
    const container = document.getElementById('floor-plans-container');
    const gridBtn = document.getElementById('grid-view');
    const listBtn = document.getElementById('list-view');
    
    if (mode === 'list') {
        container.className = 'space-y-4 mb-12';
        gridBtn.className = 'p-2 rounded-lg border border-gray-300 hover:bg-gray-50';
        listBtn.className = 'p-2 rounded-lg border border-gray-300 bg-blue-50 text-blue-600';
        
        // Update cards to list view
        const cards = container.children;
        for (let card of cards) {
            card.className = 'bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 flex';
        }
    } else {
        container.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12';
        gridBtn.className = 'p-2 rounded-lg border border-gray-300 bg-blue-50 text-blue-600';
        listBtn.className = 'p-2 rounded-lg border border-gray-300 hover:bg-gray-50';
        
        // Update cards to grid view
        const cards = container.children;
        for (let card of cards) {
            card.className = 'bg-white rounded-xl shadow-sm overflow-hidden card-hover border border-gray-200';
        }
    }
    
    localStorage.setItem('artsplans_view_mode', mode);
}

function toggleFavorite(postId) {
    // Add to favorites functionality
    console.log('Toggle favorite for post:', postId);
    // This would typically make an AJAX call to add/remove from user favorites
}

// Restore view mode from localStorage
document.addEventListener('DOMContentLoaded', function() {
    const savedViewMode = localStorage.getItem('artsplans_view_mode');
    if (savedViewMode) {
        setViewMode(savedViewMode);
    }
});
</script>

<?php get_footer(); ?>

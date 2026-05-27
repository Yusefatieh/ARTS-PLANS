<?php
/**
 * The main template file - ArtsPlans Homepage
 *
 * @package ArtsPlans
 */

get_header(); ?>

<main id="primary" class="site-main">
    <!-- Hero Section -->
    <section class="hero-section relative min-h-[80vh] bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20">
        <!-- Background Pattern -->
        <div class="absolute inset-0 bg-grid-pattern opacity-[0.02]"></div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
        <div class="absolute top-40 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute bottom-40 left-1/4 w-24 h-24 bg-green-500/10 rounded-full blur-xl animate-pulse" style="animation-delay: 0.5s;"></div>

        <div class="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
            <div class="text-center space-y-8">
                <!-- Main Heading -->
                <div class="space-y-4">
                    <span class="inline-flex items-center px-4 py-2 text-sm bg-gray-100 text-gray-800 rounded-full">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                        </svg>
                        <?php _e('Interior Design Resources for Everyone', 'artsplans'); ?>
                    </span>

                    <h1 class="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                        <?php echo esc_html(get_theme_mod('artsplans_hero_title', __('Download Beautiful', 'artsplans'))); ?>
                        <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            <?php _e('Interior Designs', 'artsplans'); ?>
                        </span>
                    </h1>

                    <p class="hero-subtitle text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
                        <?php echo esc_html(get_theme_mod('artsplans_hero_subtitle', __('Millions of floor plans, 3D models, and design assets. All ready to download and use in your projects.', 'artsplans'))); ?>
                    </p>
                </div>

                <!-- Large Search Bar -->
                <div class="hero-search max-w-4xl mx-auto">
                    <div class="relative">
                        <div class="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                        <div class="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-200/50">
                            <form method="get" action="<?php echo esc_url(home_url('/')); ?>" class="flex items-center">
                                <svg class="w-6 h-6 text-gray-400 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <input type="text" name="s" 
                                       placeholder="<?php _e('Search for floor plans, 3D models, furniture...', 'artsplans'); ?>"
                                       value="<?php echo get_search_query(); ?>"
                                       class="hero-search-input flex-1 px-4 py-4 text-lg bg-transparent border-0 focus:outline-none focus:ring-0" />
                                <button type="submit" class="btn btn-primary m-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all">
                                    <?php _e('Search', 'artsplans'); ?>
                                </button>
                            </form>
                        </div>
                    </div>

                    <!-- Trending Searches -->
                    <div class="flex flex-wrap items-center justify-center gap-2 mt-6">
                        <span class="text-sm text-gray-500 mr-2">
                            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                            </svg>
                            <?php _e('Trending:', 'artsplans'); ?>
                        </span>
                        <?php 
                        $trending_searches = array(
                            __('Modern kitchen', 'artsplans'),
                            __('Living room', 'artsplans'),
                            __('Bedroom design', 'artsplans'),
                            __('Office layout', 'artsplans'),
                            __('Bathroom plans', 'artsplans'),
                            __('Villa floor plan', 'artsplans')
                        );
                        foreach ($trending_searches as $search): ?>
                            <a href="<?php echo esc_url(home_url('/?s=' . urlencode($search))); ?>" 
                               class="text-xs px-3 py-1 border border-gray-300 rounded-full hover:bg-blue-50 hover:border-blue-200 transition-colors">
                                <?php echo esc_html($search); ?>
                            </a>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Quick Actions -->
                <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a href="<?php echo esc_url(get_post_type_archive_link('floor_plan')); ?>" 
                       class="btn btn-secondary inline-flex items-center px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors">
                        <?php _e('Browse All Categories', 'artsplans'); ?>
                    </a>
                    <a href="<?php echo esc_url(get_page_link(get_page_by_path('upload'))); ?>" 
                       class="btn btn-primary inline-flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white rounded-lg transition-all">
                        <?php _e('Start Selling Your Designs', 'artsplans'); ?>
                    </a>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto pt-12">
                    <?php 
                    $floor_plans_count = wp_count_posts('floor_plan')->publish ?? 0;
                    $models_count = wp_count_posts('model_3d')->publish ?? 0;
                    $furniture_count = wp_count_posts('furniture')->publish ?? 0;
                    $users_count = count(get_users()) ?? 0;
                    
                    $stats = array(
                        array(
                            'value' => number_format($floor_plans_count + $furniture_count) . '+',
                            'label' => __('Floor Plans', 'artsplans'),
                            'icon' => 'M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10'
                        ),
                        array(
                            'value' => number_format($models_count) . '+',
                            'label' => __('3D Models', 'artsplans'),
                            'icon' => 'M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
                        ),
                        array(
                            'value' => number_format($users_count) . '+',
                            'label' => __('Creators', 'artsplans'),
                            'icon' => 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
                        ),
                        array(
                            'value' => '4.8',
                            'label' => __('Rating', 'artsplans'),
                            'icon' => 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
                        )
                    );
                    
                    foreach ($stats as $stat): ?>
                        <div class="text-center fade-in">
                            <div class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mb-2">
                                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="<?php echo esc_attr($stat['icon']); ?>"></path>
                                </svg>
                            </div>
                            <div class="text-2xl md:text-3xl font-bold text-gray-900">
                                <?php echo esc_html($stat['value']); ?>
                            </div>
                            <div class="text-sm text-gray-600"><?php echo esc_html($stat['label']); ?></div>
                        </div>
                    <?php endforeach; ?>
                </div>
            </div>
        </div>
    </section>

    <!-- Featured Categories -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    <?php _e('Browse by Category', 'artsplans'); ?>
                </h2>
                <p class="text-xl text-gray-600">
                    <?php _e('Find the perfect design resources for your project', 'artsplans'); ?>
                </p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                <?php 
                $categories = artsplans_get_design_categories();
                if ($categories && !is_wp_error($categories)):
                    foreach (array_slice($categories, 0, 8) as $category): ?>
                        <a href="<?php echo esc_url(get_term_link($category)); ?>" 
                           class="design-card group bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all card-hover">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0v-4a1 1 0 011-1h1m0-3V2a1 1 0 011-1h2a1 1 0 011 1v6m0 0a1 1 0 011 1v1M9 7h6"></path>
                                </svg>
                            </div>
                            <h3 class="design-card-title font-semibold text-gray-900 mb-2"><?php echo esc_html($category->name); ?></h3>
                            <p class="text-sm text-gray-600"><?php echo esc_html($category->count); ?> <?php _e('items', 'artsplans'); ?></p>
                        </a>
                    <?php endforeach;
                else: 
                    // Show default categories if none exist
                    $default_categories = array(
                        array('name' => __('Modern Kitchen', 'artsplans'), 'count' => '120'),
                        array('name' => __('Living Room', 'artsplans'), 'count' => '95'),
                        array('name' => __('Bedroom', 'artsplans'), 'count' => '87'),
                        array('name' => __('Bathroom', 'artsplans'), 'count' => '64'),
                        array('name' => __('Office Space', 'artsplans'), 'count' => '52'),
                        array('name' => __('Villa Plans', 'artsplans'), 'count' => '43'),
                        array('name' => __('Apartment', 'artsplans'), 'count' => '38'),
                        array('name' => __('Commercial', 'artsplans'), 'count' => '29'),
                    );
                    foreach ($default_categories as $category): ?>
                        <div class="design-card group bg-gray-50 rounded-xl p-6 text-center hover:shadow-lg transition-all card-hover">
                            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H9m0 0H5m4 0v-4a1 1 0 011-1h1m0-3V2a1 1 0 011-1h2a1 1 0 011 1v6m0 0a1 1 0 011 1v1M9 7h6"></path>
                                </svg>
                            </div>
                            <h3 class="design-card-title font-semibold text-gray-900 mb-2"><?php echo esc_html($category['name']); ?></h3>
                            <p class="text-sm text-gray-600"><?php echo esc_html($category['count']); ?> <?php _e('items', 'artsplans'); ?></p>
                        </div>
                    <?php endforeach;
                endif; ?>
            </div>
        </div>
    </section>

    <!-- Featured Designs -->
    <section class="py-16 bg-gray-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    <?php _e('Featured Designs', 'artsplans'); ?>
                </h2>
                <p class="text-xl text-gray-600">
                    <?php _e('Popular downloads from our community', 'artsplans'); ?>
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php 
                $featured_designs = artsplans_get_featured_designs(6);
                if (!empty($featured_designs)):
                    foreach ($featured_designs as $design):
                        setup_postdata($design); ?>
                        <article class="design-card bg-white rounded-xl shadow-sm overflow-hidden card-hover border border-gray-200">
                            <?php if (has_post_thumbnail($design->ID)): ?>
                                <div class="design-card-image aspect-video bg-gray-200">
                                    <a href="<?php echo esc_url(get_permalink($design->ID)); ?>">
                                        <?php echo get_the_post_thumbnail($design->ID, 'artsplans-card', array('class' => 'w-full h-full object-cover')); ?>
                                    </a>
                                </div>
                            <?php else: ?>
                                <div class="design-card-image aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                    <svg class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                            <?php endif; ?>
                            
                            <div class="design-card-content p-6">
                                <h3 class="design-card-title font-semibold text-gray-900 mb-2">
                                    <a href="<?php echo esc_url(get_permalink($design->ID)); ?>" class="hover:text-blue-600 transition-colors">
                                        <?php echo esc_html(get_the_title($design->ID)); ?>
                                    </a>
                                </h3>
                                
                                <p class="text-gray-600 text-sm mb-4">
                                    <?php echo esc_html(wp_trim_words(get_the_excerpt($design->ID), 15)); ?>
                                </p>
                                
                                <div class="flex items-center justify-between">
                                    <span class="design-card-price text-lg font-bold text-blue-600">
                                        <?php echo artsplans_format_price(get_post_meta($design->ID, '_artsplans_price', true)); ?>
                                    </span>
                                    <span class="text-sm text-gray-500">
                                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                        </svg>
                                        <?php echo artsplans_format_download_count(get_post_meta($design->ID, '_artsplans_download_count', true)); ?>
                                    </span>
                                </div>
                            </div>
                        </article>
                    <?php endforeach;
                    wp_reset_postdata();
                else:
                    // Show sample designs if none exist
                    for ($i = 1; $i <= 6; $i++): ?>
                        <article class="design-card bg-white rounded-xl shadow-sm overflow-hidden card-hover border border-gray-200">
                            <div class="design-card-image aspect-video bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                <svg class="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div class="design-card-content p-6">
                                <h3 class="design-card-title font-semibold text-gray-900 mb-2">
                                    <?php printf(__('Sample Design %d', 'artsplans'), $i); ?>
                                </h3>
                                <p class="text-gray-600 text-sm mb-4">
                                    <?php _e('This is a sample design. Add your own content to see it here.', 'artsplans'); ?>
                                </p>
                                <div class="flex items-center justify-between">
                                    <span class="design-card-price text-lg font-bold text-blue-600">
                                        <?php echo ($i % 2 == 0) ? artsplans_format_price(29.99) : artsplans_format_price(0); ?>
                                    </span>
                                    <span class="text-sm text-gray-500">
                                        <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                                        </svg>
                                        <?php echo artsplans_format_download_count(rand(50, 500)); ?>
                                    </span>
                                </div>
                            </div>
                        </article>
                    <?php endfor;
                endif; ?>
            </div>

            <!-- View All Button -->
            <div class="text-center mt-12">
                <a href="<?php echo esc_url(get_post_type_archive_link('floor_plan')); ?>" 
                   class="btn btn-primary inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <?php _e('View All Designs', 'artsplans'); ?>
                    <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                </a>
            </div>
        </div>
    </section>

    <!-- Creator Spotlight -->
    <section class="py-16 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    <?php _e('Featured Creators', 'artsplans'); ?>
                </h2>
                <p class="text-xl text-gray-600">
                    <?php _e('Meet the talented designers behind our best work', 'artsplans'); ?>
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <?php 
                $featured_creators = get_users(array(
                    'meta_key' => 'featured_creator',
                    'meta_value' => '1',
                    'number' => 6
                ));
                
                if (empty($featured_creators)) {
                    // Get users with most posts if no featured creators
                    $featured_creators = get_users(array(
                        'orderby' => 'post_count',
                        'order' => 'DESC',
                        'number' => 6
                    ));
                }
                
                foreach ($featured_creators as $creator): ?>
                    <div class="design-card bg-white rounded-xl border border-gray-200 p-6 text-center card-hover">
                        <div class="mb-4">
                            <?php echo get_avatar($creator->ID, 80, '', '', array('class' => 'rounded-full mx-auto')); ?>
                        </div>
                        <h3 class="design-card-title font-semibold text-gray-900 mb-2">
                            <a href="<?php echo esc_url(get_author_posts_url($creator->ID)); ?>" class="hover:text-blue-600 transition-colors">
                                <?php echo esc_html($creator->display_name); ?>
                            </a>
                        </h3>
                        <p class="text-gray-600 text-sm mb-4">
                            <?php 
                            $user_posts = count_user_posts($creator->ID, array('floor_plan', 'model_3d', 'furniture'));
                            printf(_n('%d design', '%d designs', $user_posts, 'artsplans'), $user_posts);
                            ?>
                        </p>
                        <a href="<?php echo esc_url(get_author_posts_url($creator->ID)); ?>" 
                           class="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                            <?php _e('View Portfolio', 'artsplans'); ?>
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </a>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 class="text-3xl md:text-4xl font-bold text-white mb-4">
                <?php _e('Stay Updated', 'artsplans'); ?>
            </h2>
            <p class="text-xl text-blue-100 mb-8">
                <?php _e('Get the latest design resources and exclusive content delivered to your inbox.', 'artsplans'); ?>
            </p>
            
            <form class="newsletter-form max-w-md mx-auto flex gap-4" method="post">
                <input type="email" name="email" required
                       placeholder="<?php _e('Enter your email', 'artsplans'); ?>"
                       class="flex-1 px-4 py-3 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" />
                <button type="submit" class="btn px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 font-medium rounded-lg transition-colors">
                    <?php _e('Subscribe', 'artsplans'); ?>
                </button>
            </form>
            
            <p class="text-sm text-blue-100 mt-4">
                <?php _e('No spam, unsubscribe at any time.', 'artsplans'); ?>
            </p>
        </div>
    </section>
</main>

<?php get_footer(); ?>

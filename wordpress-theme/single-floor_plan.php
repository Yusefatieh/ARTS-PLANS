<?php
/**
 * Single Floor Plan template
 *
 * @package ArtsPlans
 */

get_header(); ?>

<?php while (have_posts()): the_post(); ?>
<main id="primary" class="site-main">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Breadcrumb -->
        <nav class="mb-6" aria-label="<?php _e('Breadcrumb', 'artsplans'); ?>">
            <ol class="flex items-center space-x-2 text-sm text-gray-500">
                <li><a href="<?php echo esc_url(home_url()); ?>" class="hover:text-blue-600"><?php _e('Home', 'artsplans'); ?></a></li>
                <li><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></li>
                <li><a href="<?php echo esc_url(get_post_type_archive_link('floor_plan')); ?>" class="hover:text-blue-600"><?php _e('Floor Plans', 'artsplans'); ?></a></li>
                <li><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg></li>
                <li class="text-gray-900 font-medium"><?php the_title(); ?></li>
            </ol>
        </nav>

        <div class="lg:grid lg:grid-cols-3 lg:gap-8">
            <!-- Main Content -->
            <div class="lg:col-span-2">
                <!-- Image Gallery -->
                <div class="mb-8">
                    <?php if (has_post_thumbnail()): ?>
                        <div class="aspect-video bg-gray-200 rounded-xl overflow-hidden mb-4">
                            <?php the_post_thumbnail('large', array('class' => 'w-full h-full object-cover')); ?>
                        </div>
                    <?php endif; ?>
                    
                    <!-- Additional Images (if any) -->
                    <?php 
                    $gallery_images = get_post_meta(get_the_ID(), '_artsplans_gallery_images', true);
                    if ($gallery_images): ?>
                        <div class="grid grid-cols-4 gap-4">
                            <?php foreach ($gallery_images as $image_id): ?>
                                <div class="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity">
                                    <?php echo wp_get_attachment_image($image_id, 'artsplans-thumbnail', false, array('class' => 'w-full h-full object-cover')); ?>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Title and Meta -->
                <div class="mb-8">
                    <div class="flex items-start justify-between mb-4">
                        <h1 class="text-3xl md:text-4xl font-bold text-gray-900"><?php the_title(); ?></h1>
                        <button class="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors" 
                                onclick="toggleFavorite(<?php echo get_the_ID(); ?>)"
                                aria-label="<?php _e('Add to favorites', 'artsplans'); ?>">
                            <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>
                    </div>

                    <!-- Meta Information -->
                    <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <?php _e('By', 'artsplans'); ?> <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" class="text-blue-600 hover:underline ml-1"><?php the_author(); ?></a>
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <?php echo get_the_date(); ?>
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                            </svg>
                            <?php echo artsplans_format_download_count(get_post_meta(get_the_ID(), '_artsplans_download_count', true)); ?> <?php _e('downloads', 'artsplans'); ?>
                        </span>
                        <span class="flex items-center">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                            </svg>
                            <?php 
                            $terms = get_the_terms(get_the_ID(), 'design_category');
                            if ($terms && !is_wp_error($terms)) {
                                $term_names = array();
                                foreach ($terms as $term) {
                                    $term_names[] = '<a href="' . esc_url(get_term_link($term)) . '" class="text-blue-600 hover:underline">' . esc_html($term->name) . '</a>';
                                }
                                echo implode(', ', $term_names);
                            }
                            ?>
                        </span>
                    </div>

                    <!-- Tags -->
                    <?php if (has_tag()): ?>
                        <div class="flex flex-wrap gap-2 mb-6">
                            <?php 
                            $tags = get_the_tags();
                            if ($tags):
                                foreach ($tags as $tag): ?>
                                    <a href="<?php echo esc_url(get_tag_link($tag)); ?>" 
                                       class="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-blue-100 hover:text-blue-600 transition-colors">
                                        #<?php echo esc_html($tag->name); ?>
                                    </a>
                                <?php endforeach;
                            endif; ?>
                        </div>
                    <?php endif; ?>
                </div>

                <!-- Description -->
                <div class="prose prose-lg max-w-none mb-8">
                    <?php the_content(); ?>
                </div>

                <!-- Specifications -->
                <?php 
                $software = get_post_meta(get_the_ID(), '_artsplans_software', true);
                $file_size = get_post_meta(get_the_ID(), '_artsplans_file_size', true);
                $dimensions = get_post_meta(get_the_ID(), '_artsplans_dimensions', true);
                if ($software || $file_size || $dimensions): ?>
                    <div class="bg-gray-50 rounded-xl p-6 mb-8">
                        <h3 class="text-lg font-semibold text-gray-900 mb-4"><?php _e('Specifications', 'artsplans'); ?></h3>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <?php if ($software): ?>
                                <div>
                                    <dt class="text-sm font-medium text-gray-600"><?php _e('Compatible Software', 'artsplans'); ?></dt>
                                    <dd class="text-sm text-gray-900 mt-1"><?php echo esc_html($software); ?></dd>
                                </div>
                            <?php endif; ?>
                            <?php if ($file_size): ?>
                                <div>
                                    <dt class="text-sm font-medium text-gray-600"><?php _e('File Size', 'artsplans'); ?></dt>
                                    <dd class="text-sm text-gray-900 mt-1"><?php echo esc_html($file_size); ?></dd>
                                </div>
                            <?php endif; ?>
                            <?php if ($dimensions): ?>
                                <div>
                                    <dt class="text-sm font-medium text-gray-600"><?php _e('Dimensions', 'artsplans'); ?></dt>
                                    <dd class="text-sm text-gray-900 mt-1"><?php echo esc_html($dimensions); ?></dd>
                                </div>
                            <?php endif; ?>
                        </div>
                    </div>
                <?php endif; ?>

                <!-- Reviews Section -->
                <div class="mb-8">
                    <h3 class="text-xl font-semibold text-gray-900 mb-6"><?php _e('Reviews', 'artsplans'); ?></h3>
                    <?php comments_template(); ?>
                </div>
            </div>

            <!-- Sidebar -->
            <div class="lg:col-span-1 mt-8 lg:mt-0">
                <!-- Purchase Card -->
                <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6 sticky top-24">
                    <div class="text-center mb-6">
                        <div class="text-3xl font-bold text-blue-600 mb-2">
                            <?php echo artsplans_format_price(get_post_meta(get_the_ID(), '_artsplans_price', true)); ?>
                        </div>
                        <p class="text-gray-600 text-sm"><?php _e('Instant download after purchase', 'artsplans'); ?></p>
                    </div>

                    <?php 
                    $price = get_post_meta(get_the_ID(), '_artsplans_price', true);
                    if (empty($price) || $price == 0): ?>
                        <!-- Free Download -->
                        <button class="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-4">
                            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                            </svg>
                            <?php _e('Download Free', 'artsplans'); ?>
                        </button>
                    <?php else: ?>
                        <!-- Purchase Buttons -->
                        <button class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors mb-3">
                            <svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h4m0-8h6m-6 0a2 2 0 00-2 2v2m0 0a2 2 0 002 2h2a2 2 0 002-2v-2m-4 0h4"></path>
                            </svg>
                            <?php _e('Add to Cart', 'artsplans'); ?>
                        </button>
                        <button class="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium transition-colors">
                            <?php _e('Buy Now', 'artsplans'); ?>
                        </button>
                    <?php endif; ?>

                    <!-- Additional Actions -->
                    <div class="flex gap-2 mt-4">
                        <button class="flex-1 flex items-center justify-center py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"></path>
                            </svg>
                            <?php _e('Share', 'artsplans'); ?>
                        </button>
                        <button class="flex-1 flex items-center justify-center py-2 px-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                            <?php _e('Save', 'artsplans'); ?>
                        </button>
                    </div>

                    <!-- License Info -->
                    <div class="mt-6 pt-6 border-t border-gray-200">
                        <h4 class="font-medium text-gray-900 mb-2"><?php _e('License Information', 'artsplans'); ?></h4>
                        <ul class="text-sm text-gray-600 space-y-1">
                            <li class="flex items-center">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <?php _e('Commercial use allowed', 'artsplans'); ?>
                            </li>
                            <li class="flex items-center">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <?php _e('Modify and adapt', 'artsplans'); ?>
                            </li>
                            <li class="flex items-center">
                                <svg class="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <?php _e('Include in projects', 'artsplans'); ?>
                            </li>
                        </ul>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('licensing'))); ?>" 
                           class="text-blue-600 hover:underline text-sm mt-2 inline-block">
                            <?php _e('View full license', 'artsplans'); ?>
                        </a>
                    </div>
                </div>

                <!-- Creator Info -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
                    <h4 class="font-semibold text-gray-900 mb-4"><?php _e('About the Creator', 'artsplans'); ?></h4>
                    <div class="flex items-center space-x-3 mb-4">
                        <?php echo get_avatar(get_the_author_meta('ID'), 48, '', '', array('class' => 'rounded-full')); ?>
                        <div>
                            <h5 class="font-medium text-gray-900">
                                <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" class="hover:text-blue-600 transition-colors">
                                    <?php the_author(); ?>
                                </a>
                            </h5>
                            <p class="text-sm text-gray-600">
                                <?php 
                                $user_posts = count_user_posts(get_the_author_meta('ID'));
                                printf(_n('%d design', '%d designs', $user_posts, 'artsplans'), $user_posts);
                                ?>
                            </p>
                        </div>
                    </div>
                    <?php if (get_the_author_meta('description')): ?>
                        <p class="text-sm text-gray-600 mb-4"><?php echo esc_html(get_the_author_meta('description')); ?></p>
                    <?php endif; ?>
                    <a href="<?php echo esc_url(get_author_posts_url(get_the_author_meta('ID'))); ?>" 
                       class="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium">
                        <?php _e('View all designs', 'artsplans'); ?>
                        <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
                        </svg>
                    </a>
                </div>

                <!-- Related Categories -->
                <?php 
                $terms = get_the_terms(get_the_ID(), 'design_category');
                if ($terms && !is_wp_error($terms)): ?>
                    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                        <h4 class="font-semibold text-gray-900 mb-4"><?php _e('Related Categories', 'artsplans'); ?></h4>
                        <div class="space-y-2">
                            <?php foreach ($terms as $term): ?>
                                <a href="<?php echo esc_url(get_term_link($term)); ?>" 
                                   class="block p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors group">
                                    <div class="flex items-center justify-between">
                                        <span class="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                            <?php echo esc_html($term->name); ?>
                                        </span>
                                        <span class="text-xs text-gray-500">
                                            <?php echo $term->count; ?> <?php _e('items', 'artsplans'); ?>
                                        </span>
                                    </div>
                                </a>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>

        <!-- Related/Similar Designs -->
        <?php 
        $related_posts = get_posts(array(
            'post_type' => 'floor_plan',
            'posts_per_page' => 4,
            'post__not_in' => array(get_the_ID()),
            'tax_query' => array(
                array(
                    'taxonomy' => 'design_category',
                    'field' => 'term_id',
                    'terms' => wp_get_post_terms(get_the_ID(), 'design_category', array('fields' => 'ids')),
                ),
            ),
        ));
        
        if ($related_posts): ?>
            <div class="mt-16">
                <h3 class="text-2xl font-bold text-gray-900 mb-8 text-center"><?php _e('Related Floor Plans', 'artsplans'); ?></h3>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <?php foreach ($related_posts as $post):
                        setup_postdata($post); ?>
                        <article class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 card-hover">
                            <?php if (has_post_thumbnail()): ?>
                                <div class="aspect-video bg-gray-200">
                                    <a href="<?php the_permalink(); ?>">
                                        <?php the_post_thumbnail('artsplans-card', array('class' => 'w-full h-full object-cover')); ?>
                                    </a>
                                </div>
                            <?php endif; ?>
                            <div class="p-4">
                                <h4 class="font-semibold text-gray-900 mb-2">
                                    <a href="<?php the_permalink(); ?>" class="hover:text-blue-600 transition-colors">
                                        <?php the_title(); ?>
                                    </a>
                                </h4>
                                <div class="flex items-center justify-between">
                                    <span class="text-lg font-bold text-blue-600">
                                        <?php echo artsplans_format_price(get_post_meta(get_the_ID(), '_artsplans_price', true)); ?>
                                    </span>
                                    <span class="text-sm text-gray-500">
                                        <?php echo artsplans_format_download_count(get_post_meta(get_the_ID(), '_artsplans_download_count', true)); ?>
                                    </span>
                                </div>
                            </div>
                        </article>
                    <?php endforeach;
                    wp_reset_postdata(); ?>
                </div>
            </div>
        <?php endif; ?>
    </div>
</main>
<?php endwhile; ?>

<script>
function toggleFavorite(postId) {
    // Toggle favorite functionality
    console.log('Toggle favorite for post:', postId);
    // This would typically make an AJAX call to add/remove from user favorites
}

// Image gallery functionality
document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.grid img');
    const mainImage = document.querySelector('.aspect-video img');
    
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
        });
    });
});
</script>

<?php get_footer(); ?>

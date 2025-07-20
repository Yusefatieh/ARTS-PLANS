<?php
/**
 * ArtsPlans Interior Design Theme Functions
 * Complete WordPress theme functionality
 *
 * @package ArtsPlans
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Theme constants
define('ARTSPLANS_VERSION', '1.0.0');
define('ARTSPLANS_THEME_DIR', get_template_directory());
define('ARTSPLANS_THEME_URL', get_template_directory_uri());

/**
 * Theme setup and configuration
 */
function artsplans_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ));
    add_theme_support('custom-logo', array(
        'height'      => 80,
        'width'       => 300,
        'flex-height' => true,
        'flex-width'  => true,
    ));
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('responsive-embeds');
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('custom-background');
    add_theme_support('automatic-feed-links');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'artsplans'),
        'footer'  => __('Footer Menu', 'artsplans'),
        'mobile'  => __('Mobile Menu', 'artsplans'),
        'social'  => __('Social Links', 'artsplans'),
    ));
    
    // Add image sizes
    add_image_size('artsplans-hero', 1920, 1080, true);
    add_image_size('artsplans-card', 400, 300, true);
    add_image_size('artsplans-thumbnail', 150, 150, true);
    add_image_size('artsplans-gallery', 800, 600, true);
    
    // Load text domain for translations
    load_theme_textdomain('artsplans', ARTSPLANS_THEME_DIR . '/languages');
    
    // Set content width
    if (!isset($content_width)) {
        $content_width = 1200;
    }
}
add_action('after_setup_theme', 'artsplans_setup');

/**
 * Enqueue scripts and styles
 */
function artsplans_scripts() {
    // Enqueue main stylesheet
    wp_enqueue_style('artsplans-style', get_stylesheet_uri(), array(), ARTSPLANS_VERSION);
    
    // Enqueue Google Fonts
    wp_enqueue_style('artsplans-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', array(), null);
    
    // Enqueue main JavaScript
    wp_enqueue_script('artsplans-main', ARTSPLANS_THEME_URL . '/assets/js/main.js', array('jquery'), ARTSPLANS_VERSION, true);
    
    // Localize script for AJAX and strings
    wp_localize_script('artsplans-main', 'artsplans_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('artsplans_nonce'),
        'theme_url' => ARTSPLANS_THEME_URL,
        'user_logged_in' => is_user_logged_in(),
        'strings' => array(
            'search_placeholder' => __('Search for floor plans, 3D models, furniture...', 'artsplans'),
            'loading' => __('Loading...', 'artsplans'),
            'error' => __('An error occurred. Please try again.', 'artsplans'),
            'no_results' => __('No results found.', 'artsplans'),
            'newsletter_success' => __('Thank you for subscribing!', 'artsplans'),
            'add_to_cart' => __('Add to Cart', 'artsplans'),
            'added_to_cart' => __('Added to cart!', 'artsplans'),
            'login_required' => __('Please log in to continue.', 'artsplans'),
        )
    ));
    
    // Load comment reply script
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
    
    // Add RTL support
    if (is_rtl()) {
        wp_enqueue_style('artsplans-rtl', ARTSPLANS_THEME_URL . '/assets/css/rtl.css', array('artsplans-style'), ARTSPLANS_VERSION);
    }
}
add_action('wp_enqueue_scripts', 'artsplans_scripts');

/**
 * Register widget areas
 */
function artsplans_widgets_init() {
    // Primary sidebar
    register_sidebar(array(
        'name'          => __('Primary Sidebar', 'artsplans'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here to appear in the sidebar.', 'artsplans'),
        'before_widget' => '<section id="%1$s" class="widget %2$s bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">',
        'after_widget'  => '</section>',
        'before_title'  => '<h3 class="widget-title text-lg font-semibold text-gray-900 mb-4">',
        'after_title'   => '</h3>',
    ));
    
    // Footer widgets
    for ($i = 1; $i <= 4; $i++) {
        register_sidebar(array(
            'name'          => sprintf(__('Footer Widget Area %d', 'artsplans'), $i),
            'id'            => 'footer-' . $i,
            'description'   => sprintf(__('Add widgets to footer area %d.', 'artsplans'), $i),
            'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h3 class="footer-widget-title text-lg font-semibold text-white mb-4">',
            'after_title'   => '</h3>',
        ));
    }
    
    // Hero section widget
    register_sidebar(array(
        'name'          => __('Hero Section', 'artsplans'),
        'id'            => 'hero-section',
        'description'   => __('Add widgets to appear in the hero section.', 'artsplans'),
        'before_widget' => '<div id="%1$s" class="hero-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h2 class="hero-widget-title">',
        'after_title'   => '</h2>',
    ));
}
add_action('widgets_init', 'artsplans_widgets_init');

/**
 * Custom post types for design resources
 */
function artsplans_custom_post_types() {
    // Floor Plans post type
    register_post_type('floor_plan', array(
        'labels' => array(
            'name' => __('Floor Plans', 'artsplans'),
            'singular_name' => __('Floor Plan', 'artsplans'),
            'add_new' => __('Add New Floor Plan', 'artsplans'),
            'add_new_item' => __('Add New Floor Plan', 'artsplans'),
            'edit_item' => __('Edit Floor Plan', 'artsplans'),
            'new_item' => __('New Floor Plan', 'artsplans'),
            'view_item' => __('View Floor Plan', 'artsplans'),
            'search_items' => __('Search Floor Plans', 'artsplans'),
            'not_found' => __('No floor plans found', 'artsplans'),
            'not_found_in_trash' => __('No floor plans found in trash', 'artsplans'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments', 'custom-fields'),
        'menu_icon' => 'dashicons-layout',
        'rewrite' => array('slug' => 'floor-plans'),
        'show_in_rest' => true,
        'menu_position' => 20,
    ));
    
    // 3D Models post type
    register_post_type('model_3d', array(
        'labels' => array(
            'name' => __('3D Models', 'artsplans'),
            'singular_name' => __('3D Model', 'artsplans'),
            'add_new' => __('Add New 3D Model', 'artsplans'),
            'add_new_item' => __('Add New 3D Model', 'artsplans'),
            'edit_item' => __('Edit 3D Model', 'artsplans'),
            'new_item' => __('New 3D Model', 'artsplans'),
            'view_item' => __('View 3D Model', 'artsplans'),
            'search_items' => __('Search 3D Models', 'artsplans'),
            'not_found' => __('No 3D models found', 'artsplans'),
            'not_found_in_trash' => __('No 3D models found in trash', 'artsplans'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments', 'custom-fields'),
        'menu_icon' => 'dashicons-format-gallery',
        'rewrite' => array('slug' => '3d-models'),
        'show_in_rest' => true,
        'menu_position' => 21,
    ));
    
    // Furniture post type
    register_post_type('furniture', array(
        'labels' => array(
            'name' => __('Furniture', 'artsplans'),
            'singular_name' => __('Furniture Item', 'artsplans'),
            'add_new' => __('Add New Item', 'artsplans'),
            'add_new_item' => __('Add New Furniture Item', 'artsplans'),
            'edit_item' => __('Edit Furniture Item', 'artsplans'),
            'new_item' => __('New Furniture Item', 'artsplans'),
            'view_item' => __('View Furniture Item', 'artsplans'),
            'search_items' => __('Search Furniture', 'artsplans'),
            'not_found' => __('No furniture items found', 'artsplans'),
            'not_found_in_trash' => __('No furniture items found in trash', 'artsplans'),
        ),
        'public' => true,
        'has_archive' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments', 'custom-fields'),
        'menu_icon' => 'dashicons-admin-home',
        'rewrite' => array('slug' => 'furniture'),
        'show_in_rest' => true,
        'menu_position' => 22,
    ));
}
add_action('init', 'artsplans_custom_post_types');

/**
 * Custom taxonomies
 */
function artsplans_custom_taxonomies() {
    // Design Categories taxonomy
    register_taxonomy('design_category', array('floor_plan', 'model_3d', 'furniture'), array(
        'labels' => array(
            'name' => __('Design Categories', 'artsplans'),
            'singular_name' => __('Design Category', 'artsplans'),
            'search_items' => __('Search Categories', 'artsplans'),
            'all_items' => __('All Categories', 'artsplans'),
            'parent_item' => __('Parent Category', 'artsplans'),
            'parent_item_colon' => __('Parent Category:', 'artsplans'),
            'edit_item' => __('Edit Category', 'artsplans'),
            'update_item' => __('Update Category', 'artsplans'),
            'add_new_item' => __('Add New Category', 'artsplans'),
            'new_item_name' => __('New Category Name', 'artsplans'),
            'menu_name' => __('Categories', 'artsplans'),
        ),
        'hierarchical' => true,
        'public' => true,
        'rewrite' => array('slug' => 'design-category'),
        'show_in_rest' => true,
        'show_admin_column' => true,
    ));
    
    // Style taxonomy
    register_taxonomy('design_style', array('floor_plan', 'model_3d', 'furniture'), array(
        'labels' => array(
            'name' => __('Design Styles', 'artsplans'),
            'singular_name' => __('Design Style', 'artsplans'),
            'search_items' => __('Search Styles', 'artsplans'),
            'all_items' => __('All Styles', 'artsplans'),
            'edit_item' => __('Edit Style', 'artsplans'),
            'update_item' => __('Update Style', 'artsplans'),
            'add_new_item' => __('Add New Style', 'artsplans'),
            'new_item_name' => __('New Style Name', 'artsplans'),
            'menu_name' => __('Styles', 'artsplans'),
        ),
        'hierarchical' => false,
        'public' => true,
        'rewrite' => array('slug' => 'style'),
        'show_in_rest' => true,
        'show_admin_column' => true,
    ));
}
add_action('init', 'artsplans_custom_taxonomies');

/**
 * Custom meta fields for design resources
 */
function artsplans_meta_boxes() {
    add_meta_box(
        'artsplans_design_details',
        __('Design Details', 'artsplans'),
        'artsplans_design_details_callback',
        array('floor_plan', 'model_3d', 'furniture'),
        'normal',
        'high'
    );
    
    add_meta_box(
        'artsplans_files',
        __('Download Files', 'artsplans'),
        'artsplans_files_callback',
        array('floor_plan', 'model_3d', 'furniture'),
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'artsplans_meta_boxes');

function artsplans_design_details_callback($post) {
    wp_nonce_field('artsplans_save_meta', 'artsplans_meta_nonce');
    
    $price = get_post_meta($post->ID, '_artsplans_price', true);
    $download_count = get_post_meta($post->ID, '_artsplans_download_count', true) ?: 0;
    $file_size = get_post_meta($post->ID, '_artsplans_file_size', true);
    $software = get_post_meta($post->ID, '_artsplans_software', true);
    $dimensions = get_post_meta($post->ID, '_artsplans_dimensions', true);
    $featured = get_post_meta($post->ID, '_artsplans_featured', true);
    ?>
    <table class="form-table">
        <tr>
            <th scope="row"><label for="artsplans_price"><?php _e('Price ($)', 'artsplans'); ?></label></th>
            <td>
                <input type="number" step="0.01" id="artsplans_price" name="artsplans_price" value="<?php echo esc_attr($price); ?>" class="regular-text" />
                <p class="description"><?php _e('Leave empty for free downloads', 'artsplans'); ?></p>
            </td>
        </tr>
        <tr>
            <th scope="row"><label for="artsplans_download_count"><?php _e('Download Count', 'artsplans'); ?></label></th>
            <td><input type="number" id="artsplans_download_count" name="artsplans_download_count" value="<?php echo esc_attr($download_count); ?>" class="regular-text" /></td>
        </tr>
        <tr>
            <th scope="row"><label for="artsplans_file_size"><?php _e('File Size', 'artsplans'); ?></label></th>
            <td><input type="text" id="artsplans_file_size" name="artsplans_file_size" value="<?php echo esc_attr($file_size); ?>" class="regular-text" placeholder="e.g., 5.2 MB" /></td>
        </tr>
        <tr>
            <th scope="row"><label for="artsplans_software"><?php _e('Compatible Software', 'artsplans'); ?></label></th>
            <td><input type="text" id="artsplans_software" name="artsplans_software" value="<?php echo esc_attr($software); ?>" class="regular-text" placeholder="e.g., AutoCAD, SketchUp, Blender" /></td>
        </tr>
        <tr>
            <th scope="row"><label for="artsplans_dimensions"><?php _e('Dimensions', 'artsplans'); ?></label></th>
            <td><input type="text" id="artsplans_dimensions" name="artsplans_dimensions" value="<?php echo esc_attr($dimensions); ?>" class="regular-text" placeholder="e.g., 1200x800 sq ft" /></td>
        </tr>
        <tr>
            <th scope="row"><label for="artsplans_featured"><?php _e('Featured Item', 'artsplans'); ?></label></th>
            <td>
                <input type="checkbox" id="artsplans_featured" name="artsplans_featured" value="1" <?php checked($featured, '1'); ?> />
                <label for="artsplans_featured"><?php _e('Mark as featured', 'artsplans'); ?></label>
            </td>
        </tr>
    </table>
    <?php
}

function artsplans_files_callback($post) {
    $download_files = get_post_meta($post->ID, '_artsplans_download_files', true) ?: array();
    ?>
    <div id="artsplans-files-container">
        <?php if (!empty($download_files)): ?>
            <?php foreach ($download_files as $index => $file): ?>
                <div class="artsplans-file-row" style="margin-bottom: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;">
                    <p>
                        <label><?php _e('File Name:', 'artsplans'); ?></label>
                        <input type="text" name="download_files[<?php echo $index; ?>][name]" value="<?php echo esc_attr($file['name'] ?? ''); ?>" style="width: 100%;" />
                    </p>
                    <p>
                        <label><?php _e('File URL:', 'artsplans'); ?></label>
                        <input type="url" name="download_files[<?php echo $index; ?>][url]" value="<?php echo esc_attr($file['url'] ?? ''); ?>" style="width: 100%;" />
                        <button type="button" class="button" onclick="selectFile(this)"><?php _e('Select File', 'artsplans'); ?></button>
                    </p>
                    <p>
                        <button type="button" class="button" onclick="removeFileRow(this)"><?php _e('Remove File', 'artsplans'); ?></button>
                    </p>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
    <p>
        <button type="button" id="add-file-row" class="button"><?php _e('Add File', 'artsplans'); ?></button>
    </p>
    
    <script>
    document.getElementById('add-file-row').addEventListener('click', function() {
        const container = document.getElementById('artsplans-files-container');
        const index = container.children.length;
        const newRow = document.createElement('div');
        newRow.className = 'artsplans-file-row';
        newRow.style.cssText = 'margin-bottom: 15px; padding: 15px; border: 1px solid #ddd; border-radius: 5px;';
        newRow.innerHTML = `
            <p>
                <label><?php _e('File Name:', 'artsplans'); ?></label>
                <input type="text" name="download_files[${index}][name]" style="width: 100%;" />
            </p>
            <p>
                <label><?php _e('File URL:', 'artsplans'); ?></label>
                <input type="url" name="download_files[${index}][url]" style="width: 100%;" />
                <button type="button" class="button" onclick="selectFile(this)"><?php _e('Select File', 'artsplans'); ?></button>
            </p>
            <p>
                <button type="button" class="button" onclick="removeFileRow(this)"><?php _e('Remove File', 'artsplans'); ?></button>
            </p>
        `;
        container.appendChild(newRow);
    });
    
    function removeFileRow(button) {
        button.closest('.artsplans-file-row').remove();
    }
    
    function selectFile(button) {
        const mediaUploader = wp.media({
            title: '<?php _e('Select File', 'artsplans'); ?>',
            button: {
                text: '<?php _e('Use this file', 'artsplans'); ?>'
            },
            multiple: false
        });
        
        mediaUploader.on('select', function() {
            const attachment = mediaUploader.state().get('selection').first().toJSON();
            const urlInput = button.previousElementSibling;
            const nameInput = button.parentElement.previousElementSibling.querySelector('input');
            urlInput.value = attachment.url;
            if (!nameInput.value) {
                nameInput.value = attachment.filename;
            }
        });
        
        mediaUploader.open();
    }
    </script>
    <?php
}

function artsplans_save_meta($post_id) {
    if (!isset($_POST['artsplans_meta_nonce']) || !wp_verify_nonce($_POST['artsplans_meta_nonce'], 'artsplans_save_meta')) {
        return;
    }
    
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }
    
    if (!current_user_can('edit_post', $post_id)) {
        return;
    }
    
    // Save design details
    $fields = array('artsplans_price', 'artsplans_download_count', 'artsplans_file_size', 'artsplans_software', 'artsplans_dimensions', 'artsplans_featured');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
    
    // Save download files
    if (isset($_POST['download_files'])) {
        $files = array();
        foreach ($_POST['download_files'] as $file) {
            if (!empty($file['name']) && !empty($file['url'])) {
                $files[] = array(
                    'name' => sanitize_text_field($file['name']),
                    'url' => esc_url_raw($file['url'])
                );
            }
        }
        update_post_meta($post_id, '_artsplans_download_files', $files);
    }
}
add_action('save_post', 'artsplans_save_meta');

/**
 * AJAX search functionality
 */
function artsplans_ajax_search() {
    check_ajax_referer('artsplans_nonce', 'nonce');
    
    $search_term = sanitize_text_field($_POST['search_term']);
    $category = sanitize_text_field($_POST['category'] ?? '');
    
    $args = array(
        'post_type' => array('floor_plan', 'model_3d', 'furniture'),
        'posts_per_page' => 12,
        's' => $search_term,
        'post_status' => 'publish',
    );
    
    if (!empty($category)) {
        $args['tax_query'] = array(
            array(
                'taxonomy' => 'design_category',
                'field' => 'slug',
                'terms' => $category,
            ),
        );
    }
    
    $query = new WP_Query($args);
    $results = array();
    
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $results[] = array(
                'id' => get_the_ID(),
                'title' => get_the_title(),
                'excerpt' => get_the_excerpt(),
                'thumbnail' => get_the_post_thumbnail_url(get_the_ID(), 'artsplans-card'),
                'permalink' => get_permalink(),
                'price' => get_post_meta(get_the_ID(), '_artsplans_price', true),
                'download_count' => get_post_meta(get_the_ID(), '_artsplans_download_count', true),
                'post_type' => get_post_type(),
            );
        }
        wp_reset_postdata();
    }
    
    wp_send_json_success($results);
}
add_action('wp_ajax_artsplans_search', 'artsplans_ajax_search');
add_action('wp_ajax_nopriv_artsplans_search', 'artsplans_ajax_search');

/**
 * Newsletter signup
 */
function artsplans_newsletter_signup() {
    check_ajax_referer('artsplans_nonce', 'nonce');
    
    $email = sanitize_email($_POST['email']);
    
    if (!is_email($email)) {
        wp_send_json_error(__('Please enter a valid email address.', 'artsplans'));
    }
    
    // Store newsletter subscriber (you can integrate with Mailchimp, etc.)
    $subscribers = get_option('artsplans_newsletter_subscribers', array());
    if (!in_array($email, $subscribers)) {
        $subscribers[] = $email;
        update_option('artsplans_newsletter_subscribers', $subscribers);
    }
    
    wp_send_json_success(__('Thank you for subscribing!', 'artsplans'));
}
add_action('wp_ajax_artsplans_newsletter_signup', 'artsplans_newsletter_signup');
add_action('wp_ajax_nopriv_artsplans_newsletter_signup', 'artsplans_newsletter_signup');

/**
 * Theme customizer
 */
function artsplans_customize_register($wp_customize) {
    // Hero section
    $wp_customize->add_section('artsplans_hero', array(
        'title' => __('Hero Section', 'artsplans'),
        'priority' => 30,
    ));
    
    $wp_customize->add_setting('artsplans_hero_title', array(
        'default' => __('Download Beautiful Interior Designs', 'artsplans'),
        'sanitize_callback' => 'sanitize_text_field',
    ));
    
    $wp_customize->add_control('artsplans_hero_title', array(
        'type' => 'text',
        'section' => 'artsplans_hero',
        'label' => __('Hero Title', 'artsplans'),
    ));
    
    $wp_customize->add_setting('artsplans_hero_subtitle', array(
        'default' => __('Millions of floor plans, 3D models, and design assets. All ready to download and use in your projects.', 'artsplans'),
        'sanitize_callback' => 'sanitize_textarea_field',
    ));
    
    $wp_customize->add_control('artsplans_hero_subtitle', array(
        'type' => 'textarea',
        'section' => 'artsplans_hero',
        'label' => __('Hero Subtitle', 'artsplans'),
    ));
    
    // Colors
    $wp_customize->add_setting('artsplans_primary_color', array(
        'default' => '#1e40af',
        'sanitize_callback' => 'sanitize_hex_color',
    ));
    
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'artsplans_primary_color', array(
        'label' => __('Primary Color', 'artsplans'),
        'section' => 'colors',
    )));
    
    // Social media
    $wp_customize->add_section('artsplans_social', array(
        'title' => __('Social Media', 'artsplans'),
        'priority' => 35,
    ));
    
    $social_networks = array(
        'facebook' => 'Facebook',
        'twitter' => 'Twitter', 
        'instagram' => 'Instagram',
        'linkedin' => 'LinkedIn',
        'youtube' => 'YouTube',
    );
    
    foreach ($social_networks as $network => $label) {
        $wp_customize->add_setting('artsplans_' . $network . '_url', array(
            'default' => '',
            'sanitize_callback' => 'esc_url_raw',
        ));
        
        $wp_customize->add_control('artsplans_' . $network . '_url', array(
            'type' => 'url',
            'section' => 'artsplans_social',
            'label' => $label . ' ' . __('URL', 'artsplans'),
        ));
    }
}
add_action('customize_register', 'artsplans_customize_register');

/**
 * Helper functions
 */
function artsplans_get_design_categories() {
    return get_terms(array(
        'taxonomy' => 'design_category',
        'hide_empty' => false,
    ));
}

function artsplans_get_featured_designs($count = 6) {
    return get_posts(array(
        'post_type' => array('floor_plan', 'model_3d', 'furniture'),
        'posts_per_page' => $count,
        'meta_query' => array(
            array(
                'key' => '_artsplans_featured',
                'value' => '1',
                'compare' => '='
            )
        ),
        'orderby' => 'date',
        'order' => 'DESC',
    ));
}

function artsplans_get_popular_designs($count = 6) {
    return get_posts(array(
        'post_type' => array('floor_plan', 'model_3d', 'furniture'),
        'posts_per_page' => $count,
        'meta_key' => '_artsplans_download_count',
        'orderby' => 'meta_value_num',
        'order' => 'DESC',
    ));
}

function artsplans_format_price($price) {
    if (empty($price) || $price == 0) {
        return __('Free', 'artsplans');
    }
    return '$' . number_format($price, 2);
}

function artsplans_format_download_count($count) {
    $count = intval($count);
    if ($count >= 1000000) {
        return number_format($count / 1000000, 1) . 'M';
    } elseif ($count >= 1000) {
        return number_format($count / 1000, 1) . 'K';
    }
    return number_format($count);
}

/**
 * Custom excerpt length
 */
function artsplans_excerpt_length($length) {
    return 25;
}
add_filter('excerpt_length', 'artsplans_excerpt_length');

/**
 * Custom excerpt more
 */
function artsplans_excerpt_more($more) {
    return '...';
}
add_filter('excerpt_more', 'artsplans_excerpt_more');

/**
 * Body classes
 */
function artsplans_body_classes($classes) {
    // Add class for JavaScript detection
    $classes[] = 'no-js';
    
    // Add class if sidebar is active
    if (is_active_sidebar('sidebar-1')) {
        $classes[] = 'has-sidebar';
    }
    
    return $classes;
}
add_filter('body_class', 'artsplans_body_classes');

/**
 * Admin enqueue scripts
 */
function artsplans_admin_scripts($hook) {
    if ('post.php' == $hook || 'post-new.php' == $hook) {
        wp_enqueue_media();
    }
}
add_action('admin_enqueue_scripts', 'artsplans_admin_scripts');

/**
 * Add theme support for WooCommerce if plugin is active
 */
if (class_exists('WooCommerce')) {
    add_theme_support('woocommerce');
    add_theme_support('wc-product-gallery-zoom');
    add_theme_support('wc-product-gallery-lightbox');
    add_theme_support('wc-product-gallery-slider');
}

/**
 * Pagination
 */
function artsplans_pagination() {
    global $wp_query;
    
    if ($wp_query->max_num_pages <= 1) {
        return;
    }
    
    $big = 999999999;
    
    echo '<nav class="pagination-wrapper" aria-label="' . __('Posts pagination', 'artsplans') . '">';
    echo '<div class="pagination flex justify-center items-center space-x-2 mt-8">';
    
    echo paginate_links(array(
        'base' => str_replace($big, '%#%', esc_url(get_pagenum_link($big))),
        'format' => '?paged=%#%',
        'current' => max(1, get_query_var('paged')),
        'total' => $wp_query->max_num_pages,
        'prev_text' => '&laquo;',
        'next_text' => '&raquo;',
        'type' => 'list',
        'end_size' => 3,
        'mid_size' => 3,
    ));
    
    echo '</div>';
    echo '</nav>';
}

/**
 * Theme activation
 */
function artsplans_theme_activation() {
    // Create default pages
    $pages = array(
        'browse' => array(
            'title' => __('Browse', 'artsplans'),
            'content' => __('Browse all our design resources.', 'artsplans'),
        ),
        'categories' => array(
            'title' => __('Categories', 'artsplans'),
            'content' => __('Explore designs by category.', 'artsplans'),
        ),
        'upload' => array(
            'title' => __('Upload', 'artsplans'),
            'content' => __('Upload your designs to sell.', 'artsplans'),
        ),
        'about' => array(
            'title' => __('About', 'artsplans'),
            'content' => __('Learn more about ArtsPlans.', 'artsplans'),
        ),
        'contact' => array(
            'title' => __('Contact', 'artsplans'),
            'content' => __('Get in touch with us.', 'artsplans'),
        ),
    );
    
    foreach ($pages as $slug => $page) {
        if (!get_page_by_path($slug)) {
            wp_insert_post(array(
                'post_title' => $page['title'],
                'post_content' => $page['content'],
                'post_status' => 'publish',
                'post_type' => 'page',
                'post_name' => $slug,
            ));
        }
    }
    
    // Set up default options
    update_option('artsplans_theme_activated', true);
    
    // Flush rewrite rules
    flush_rewrite_rules();
}

// Run activation on theme switch
add_action('after_switch_theme', 'artsplans_theme_activation');

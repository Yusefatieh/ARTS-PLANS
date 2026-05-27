<?php
/**
 * ArtsPlans Interior Design Theme Functions
 *
 * @package ArtsPlans
 * @since 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Theme setup
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
    add_theme_support('custom-logo');
    add_theme_support('customize-selective-refresh-widgets');
    add_theme_support('responsive-embeds');
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    
    // Register navigation menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'artsplans'),
        'footer' => __('Footer Menu', 'artsplans'),
        'mobile' => __('Mobile Menu', 'artsplans'),
    ));
    
    // Add image sizes
    add_image_size('artsplans-hero', 1920, 1080, true);
    add_image_size('artsplans-card', 400, 300, true);
    add_image_size('artsplans-thumbnail', 150, 150, true);
    
    // Load text domain
    load_theme_textdomain('artsplans', get_template_directory() . '/languages');
}
add_action('after_setup_theme', 'artsplans_setup');

// Enqueue scripts and styles
function artsplans_scripts() {
    // Enqueue styles
    wp_enqueue_style('artsplans-style', get_stylesheet_uri(), array(), '1.0.0');
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap', array(), null);
    wp_enqueue_style('tailwindcss', 'https://cdn.tailwindcss.com', array(), '3.4.0');
    
    // Enqueue scripts
    wp_enqueue_script('artsplans-main', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), '1.0.0', true);
    
    // Localize script for AJAX
    wp_localize_script('artsplans-main', 'artsplans_ajax', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce' => wp_create_nonce('artsplans_nonce'),
        'strings' => array(
            'search_placeholder' => __('Search for floor plans, 3D models, furniture...', 'artsplans'),
            'loading' => __('Loading...', 'artsplans'),
            'error' => __('An error occurred. Please try again.', 'artsplans'),
        )
    ));
    
    // Add RTL support
    if (is_rtl()) {
        wp_enqueue_style('artsplans-rtl', get_template_directory_uri() . '/assets/css/rtl.css', array('artsplans-style'), '1.0.0');
    }
}
add_action('wp_enqueue_scripts', 'artsplans_scripts');

// Register widget areas
function artsplans_widgets_init() {
    register_sidebar(array(
        'name'          => __('Primary Sidebar', 'artsplans'),
        'id'            => 'sidebar-1',
        'description'   => __('Add widgets here.', 'artsplans'),
        'before_widget' => '<section id="%1$s" class="widget %2$s">',
        'after_widget'  => '</section>',
        'before_title'  => '<h2 class="widget-title">',
        'after_title'   => '</h2>',
    ));
    
    register_sidebar(array(
        'name'          => __('Footer Widget Area', 'artsplans'),
        'id'            => 'footer-widgets',
        'description'   => __('Add widgets to the footer area.', 'artsplans'),
        'before_widget' => '<div id="%1$s" class="footer-widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h3 class="footer-widget-title">',
        'after_title'   => '</h3>',
    ));
}
add_action('widgets_init', 'artsplans_widgets_init');

// Custom post types for design resources
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
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments'),
        'menu_icon' => 'dashicons-layout',
        'rewrite' => array('slug' => 'floor-plans'),
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
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'author', 'comments'),
        'menu_icon' => 'dashicons-format-gallery',
        'rewrite' => array('slug' => '3d-models'),
    ));
    
    // Design Categories taxonomy
    register_taxonomy('design_category', array('floor_plan', 'model_3d'), array(
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
    ));
}
add_action('init', 'artsplans_custom_post_types');

// Custom meta fields for design resources
function artsplans_meta_boxes() {
    add_meta_box(
        'artsplans_design_details',
        __('Design Details', 'artsplans'),
        'artsplans_design_details_callback',
        array('floor_plan', 'model_3d'),
        'normal',
        'high'
    );
}
add_action('add_meta_boxes', 'artsplans_meta_boxes');

function artsplans_design_details_callback($post) {
    wp_nonce_field('artsplans_save_meta', 'artsplans_meta_nonce');
    
    $price = get_post_meta($post->ID, '_artsplans_price', true);
    $download_count = get_post_meta($post->ID, '_artsplans_download_count', true);
    $file_size = get_post_meta($post->ID, '_artsplans_file_size', true);
    $software = get_post_meta($post->ID, '_artsplans_software', true);
    ?>
    <table class="form-table">
        <tr>
            <th scope="row"><label for="artsplans_price"><?php _e('Price', 'artsplans'); ?></label></th>
            <td><input type="number" step="0.01" id="artsplans_price" name="artsplans_price" value="<?php echo esc_attr($price); ?>" class="regular-text" /></td>
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
    </table>
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
    
    $fields = array('artsplans_price', 'artsplans_download_count', 'artsplans_file_size', 'artsplans_software');
    
    foreach ($fields as $field) {
        if (isset($_POST[$field])) {
            update_post_meta($post_id, '_' . $field, sanitize_text_field($_POST[$field]));
        }
    }
}
add_action('save_post', 'artsplans_save_meta');

// AJAX search functionality
function artsplans_ajax_search() {
    check_ajax_referer('artsplans_nonce', 'nonce');
    
    $search_term = sanitize_text_field($_POST['search_term']);
    $category = sanitize_text_field($_POST['category']);
    
    $args = array(
        'post_type' => array('floor_plan', 'model_3d'),
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
            );
        }
        wp_reset_postdata();
    }
    
    wp_send_json_success($results);
}
add_action('wp_ajax_artsplans_search', 'artsplans_ajax_search');
add_action('wp_ajax_nopriv_artsplans_search', 'artsplans_ajax_search');

// Theme customizer
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
}
add_action('customize_register', 'artsplans_customize_register');

// Helper functions
function artsplans_get_design_categories() {
    return get_terms(array(
        'taxonomy' => 'design_category',
        'hide_empty' => false,
    ));
}

function artsplans_get_featured_designs($count = 6) {
    return get_posts(array(
        'post_type' => array('floor_plan', 'model_3d'),
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
    if ($count >= 1000) {
        return number_format($count / 1000, 1) . 'K';
    }
    return number_format($count);
}

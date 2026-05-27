<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="profile" href="https://gmpg.org/xfn/11">
    
    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#primary"><?php _e('Skip to content', 'artsplans'); ?></a>

    <header id="masthead" class="site-header">
        <nav class="main-navigation bg-white border-b border-gray-200 sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo -->
                    <div class="flex items-center">
                        <?php 
                        $custom_logo_id = get_theme_mod('custom_logo');
                        if ($custom_logo_id): ?>
                            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center space-x-3">
                                <?php echo wp_get_attachment_image($custom_logo_id, 'full', false, array('class' => 'h-10 w-auto')); ?>
                                <span class="font-bold text-xl text-gray-900"><?php bloginfo('name'); ?></span>
                            </a>
                        <?php else: ?>
                            <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center space-x-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                                    <span class="text-white font-bold text-lg">A</span>
                                </div>
                                <span class="font-bold text-xl text-gray-900">
                                    <?php bloginfo('name'); ?>
                                </span>
                            </a>
                        <?php endif; ?>
                    </div>

                    <!-- Desktop Navigation -->
                    <div class="hidden md:flex items-center space-x-8">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'primary',
                            'menu_class' => 'flex items-center space-x-8',
                            'container' => false,
                            'fallback_cb' => 'artsplans_fallback_menu',
                            'walker' => new ArtsPlans_Walker_Nav_Menu(),
                        ));
                        ?>
                    </div>

                    <!-- Right side actions -->
                    <div class="hidden md:flex items-center space-x-4">
                        <!-- Search Button -->
                        <button class="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors search-toggle" 
                                aria-label="<?php _e('Search', 'artsplans'); ?>">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <span class="sr-only"><?php _e('Search', 'artsplans'); ?></span>
                        </button>

                        <!-- Cart/Shop Button -->
                        <a href="<?php echo esc_url(get_page_link(get_page_by_path('shop'))); ?>" 
                           class="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors relative" 
                           aria-label="<?php _e('Shop', 'artsplans'); ?>">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h4m0-8h6m-6 0a2 2 0 00-2 2v2m0 0a2 2 0 002 2h2a2 2 0 002-2v-2m-4 0h4"></path>
                            </svg>
                            <span class="cart-badge absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center hidden">
                                <span class="cart-count">0</span>
                            </span>
                        </a>

                        <!-- Favorites Button -->
                        <button class="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors" 
                                aria-label="<?php _e('Favorites', 'artsplans'); ?>">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                            </svg>
                        </button>

                        <!-- Language Switcher -->
                        <?php if (function_exists('pll_the_languages')): ?>
                            <div class="relative language-switcher">
                                <button class="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors flex items-center" 
                                        onclick="toggleLanguageMenu()" 
                                        aria-label="<?php _e('Language', 'artsplans'); ?>">
                                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c2.485 0 4.5-4.03 4.5-9s-2.015-9-4.5-9m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9"></path>
                                    </svg>
                                    <span class="text-sm"><?php echo strtoupper(pll_current_language()); ?></span>
                                </button>
                                <div id="language-menu" class="hidden absolute right-0 mt-2 py-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <?php pll_the_languages(array('dropdown' => 0, 'show_flags' => 0, 'show_names' => 1)); ?>
                                </div>
                            </div>
                        <?php endif; ?>

                        <!-- User Account -->
                        <?php if (is_user_logged_in()): ?>
                            <div class="relative user-menu">
                                <button class="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors flex items-center" 
                                        onclick="toggleUserMenu()" 
                                        aria-label="<?php _e('Account', 'artsplans'); ?>">
                                    <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <span class="text-sm"><?php _e('Account', 'artsplans'); ?></span>
                                </button>
                                <div id="user-menu" class="hidden absolute right-0 mt-2 py-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200">
                                    <a href="<?php echo esc_url(get_dashboard_url()); ?>" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <?php _e('Dashboard', 'artsplans'); ?>
                                    </a>
                                    <a href="<?php echo esc_url(get_edit_profile_url()); ?>" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <?php _e('Profile Settings', 'artsplans'); ?>
                                    </a>
                                    <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <?php _e('My Downloads', 'artsplans'); ?>
                                    </a>
                                    <div class="border-t border-gray-100 my-1"></div>
                                    <a href="<?php echo esc_url(wp_logout_url(home_url())); ?>" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <?php _e('Sign Out', 'artsplans'); ?>
                                    </a>
                                </div>
                            </div>
                        <?php else: ?>
                            <a href="<?php echo esc_url(wp_login_url()); ?>" 
                               class="text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors flex items-center">
                                <svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                </svg>
                                <span class="text-sm"><?php _e('Login', 'artsplans'); ?></span>
                            </a>
                        <?php endif; ?>

                        <!-- Upload/Sell Button -->
                        <a href="<?php echo esc_url(get_page_link(get_page_by_path('upload'))); ?>" 
                           class="btn btn-primary bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
                            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                            <?php _e('Upload', 'artsplans'); ?>
                        </a>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="md:hidden">
                        <button class="mobile-menu-toggle text-gray-700 hover:text-blue-600 p-2 rounded-lg transition-colors" 
                                aria-label="<?php _e('Menu', 'artsplans'); ?>">
                            <svg id="mobile-menu-open" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                            <svg id="mobile-menu-close" class="w-5 h-5 hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Navigation -->
                <div id="mobile-menu" class="hidden md:hidden border-t border-gray-200">
                    <div class="px-2 pt-2 pb-3 space-y-1">
                        <?php
                        wp_nav_menu(array(
                            'theme_location' => 'mobile',
                            'menu_class' => 'mobile-nav',
                            'container' => false,
                            'fallback_cb' => 'artsplans_fallback_mobile_menu',
                            'walker' => new ArtsPlans_Mobile_Walker_Nav_Menu(),
                        ));
                        ?>

                        <div class="pt-4 border-t border-gray-200 mt-4 space-y-2">
                            <button class="search-toggle w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                                <?php _e('Search', 'artsplans'); ?>
                            </button>

                            <?php if (!is_user_logged_in()): ?>
                                <a href="<?php echo esc_url(wp_login_url()); ?>" 
                                   class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">
                                    <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                    </svg>
                                    <?php _e('Login', 'artsplans'); ?>
                                </a>
                            <?php endif; ?>

                            <a href="<?php echo esc_url(get_page_link(get_page_by_path('upload'))); ?>" 
                               class="block w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-center">
                                <svg class="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                                </svg>
                                <?php _e('Upload', 'artsplans'); ?>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Search Overlay -->
        <div id="search-overlay" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div class="flex items-start justify-center pt-20 px-4">
                <div class="bg-white rounded-2xl p-6 w-full max-w-2xl">
                    <div class="flex items-center justify-between mb-4">
                        <h3 class="text-lg font-semibold"><?php _e('Search', 'artsplans'); ?></h3>
                        <button class="search-toggle text-gray-400 hover:text-gray-600">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                    <form method="get" action="<?php echo esc_url(home_url('/')); ?>">
                        <div class="relative">
                            <svg class="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                            <input type="text" name="s" id="live-search-input"
                                   placeholder="<?php _e('Search for floor plans, 3D models, furniture...', 'artsplans'); ?>"
                                   class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                                   autofocus />
                        </div>
                        <button type="submit" class="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors">
                            <?php _e('Search', 'artsplans'); ?>
                        </button>
                    </form>
                    <div id="live-search-results" class="mt-4 max-h-60 overflow-y-auto hidden"></div>
                </div>
            </div>
        </div>
    </header>

<?php
// Custom Nav Walker Classes
class ArtsPlans_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        
        $output .= '<a href="' . esc_url($item->url) . '" class="text-sm font-medium transition-colors hover:text-blue-600 ' . (in_array('current-menu-item', $classes) ? 'text-blue-600' : 'text-gray-700') . '">';
        $output .= esc_html($item->title);
        $output .= '</a>';
    }
}

class ArtsPlans_Mobile_Walker_Nav_Menu extends Walker_Nav_Menu {
    function start_el(&$output, $item, $depth = 0, $args = null, $id = 0) {
        $classes = empty($item->classes) ? array() : (array) $item->classes;
        $classes[] = 'menu-item-' . $item->ID;
        
        $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item, $args));
        
        $output .= '<a href="' . esc_url($item->url) . '" class="block px-3 py-2 text-base font-medium transition-colors ' . (in_array('current-menu-item', $classes) ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50') . ' rounded-lg">';
        $output .= esc_html($item->title);
        $output .= '</a>';
    }
}

// Fallback menu functions
function artsplans_fallback_menu() {
    $pages = array(
        array('title' => __('Browse', 'artsplans'), 'url' => get_post_type_archive_link('floor_plan')),
        array('title' => __('Categories', 'artsplans'), 'url' => get_page_link(get_page_by_path('categories'))),
        array('title' => __('3D Models', 'artsplans'), 'url' => get_post_type_archive_link('model_3d')),
        array('title' => __('Furniture', 'artsplans'), 'url' => get_post_type_archive_link('furniture')),
        array('title' => __('Upload', 'artsplans'), 'url' => get_page_link(get_page_by_path('upload'))),
    );
    
    foreach ($pages as $page) {
        echo '<a href="' . esc_url($page['url']) . '" class="text-sm font-medium transition-colors hover:text-blue-600 text-gray-700">' . esc_html($page['title']) . '</a>';
    }
}

function artsplans_fallback_mobile_menu() {
    $pages = array(
        array('title' => __('Browse', 'artsplans'), 'url' => get_post_type_archive_link('floor_plan')),
        array('title' => __('Categories', 'artsplans'), 'url' => get_page_link(get_page_by_path('categories'))),
        array('title' => __('3D Models', 'artsplans'), 'url' => get_post_type_archive_link('model_3d')),
        array('title' => __('Furniture', 'artsplans'), 'url' => get_post_type_archive_link('furniture')),
        array('title' => __('Upload', 'artsplans'), 'url' => get_page_link(get_page_by_path('upload'))),
    );
    
    foreach ($pages as $page) {
        echo '<a href="' . esc_url($page['url']) . '" class="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors">' . esc_html($page['title']) . '</a>';
    }
}
?>

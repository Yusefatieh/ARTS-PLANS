<footer id="colophon" class="site-footer bg-gray-900 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Main Footer Content -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
                <!-- Company Info -->
                <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                        <?php 
                        $custom_logo_id = get_theme_mod('custom_logo');
                        if ($custom_logo_id): ?>
                            <?php echo wp_get_attachment_image($custom_logo_id, 'full', false, array('class' => 'h-8 w-auto')); ?>
                        <?php else: ?>
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                <span class="text-white font-bold text-sm">A</span>
                            </div>
                        <?php endif; ?>
                        <span class="font-bold text-lg"><?php bloginfo('name'); ?></span>
                    </div>
                    <p class="text-gray-300 text-sm leading-relaxed">
                        <?php 
                        $description = get_bloginfo('description');
                        echo $description ? esc_html($description) : __('Your premier destination for interior design resources, floor plans, and 3D models.', 'artsplans');
                        ?>
                    </p>
                    <div class="flex space-x-4">
                        <!-- Social Media Links -->
                        <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.618 5.367 11.986 11.988 11.986C18.636 23.973 24 18.605 24 11.987 24 5.367 18.636.001 12.017.001zm5.568 16.235c-.614 1.405-1.804 2.595-3.208 3.208-1.37.6-2.829.6-4.534.6-1.704 0-3.165 0-4.535-.6-1.404-.614-2.594-1.804-3.208-3.208-.6-1.369-.6-2.828-.6-4.533 0-1.706 0-3.165.6-4.535.614-1.404 1.804-2.594 3.208-3.208C8.687 3.4 10.146 3.4 11.85 3.4c1.705 0 3.165 0 4.535.6 1.404.614 2.594 1.804 3.208 3.208.6 1.37.6 2.829.6 4.535 0 1.705 0 3.164-.6 4.533zm-5.568-2.747c2.178 0 3.94-1.762 3.94-3.94s-1.762-3.94-3.94-3.94-3.94 1.762-3.94 3.94 1.762 3.94 3.94 3.94zm0-6.318c1.313 0 2.378 1.065 2.378 2.378s-1.065 2.378-2.378 2.378-2.378-1.065-2.378-2.378 1.065-2.378 2.378-2.378zm4.756-1.339c.508 0 .921-.413.921-.921s-.413-.921-.921-.921-.921.413-.921.921.413.921.921.921z"/>
                            </svg>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Quick Links -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-lg"><?php _e('Quick Links', 'artsplans'); ?></h3>
                    <nav class="space-y-2">
                        <a href="<?php echo esc_url(get_post_type_archive_link('floor_plan')); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Floor Plans', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_post_type_archive_link('model_3d')); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('3D Models', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_term_link('design_category')); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Categories', 'artsplans'); ?>
                        </a>
                        <a href="#" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Courses', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('upload'))); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Sell Your Designs', 'artsplans'); ?>
                        </a>
                    </nav>
                </div>

                <!-- Support -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-lg"><?php _e('Support', 'artsplans'); ?></h3>
                    <nav class="space-y-2">
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('help'))); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Help Center', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('contact'))); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Contact Us', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('faq'))); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('FAQ', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('community'))); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Community', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('tutorials'))); ?>" class="block text-gray-300 hover:text-white transition-colors text-sm">
                            <?php _e('Tutorials', 'artsplans'); ?>
                        </a>
                    </nav>
                </div>

                <!-- Newsletter -->
                <div class="space-y-4">
                    <h3 class="font-semibold text-lg"><?php _e('Stay Updated', 'artsplans'); ?></h3>
                    <p class="text-gray-300 text-sm">
                        <?php _e('Get the latest design resources and updates delivered to your inbox.', 'artsplans'); ?>
                    </p>
                    <form class="space-y-2" method="post" action="<?php echo esc_url(admin_url('admin-ajax.php')); ?>">
                        <input type="hidden" name="action" value="artsplans_newsletter_signup">
                        <?php wp_nonce_field('artsplans_newsletter', 'newsletter_nonce'); ?>
                        <div class="flex">
                            <input type="email" name="email" required
                                   placeholder="<?php _e('Enter your email', 'artsplans'); ?>"
                                   class="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-l-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                            <button type="submit" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg transition-colors text-sm">
                                <?php _e('Subscribe', 'artsplans'); ?>
                            </button>
                        </div>
                        <p class="text-xs text-gray-400">
                            <?php _e('We respect your privacy. Unsubscribe at any time.', 'artsplans'); ?>
                        </p>
                    </form>
                </div>
            </div>

            <!-- Popular Categories -->
            <div class="border-t border-gray-800 py-8">
                <h3 class="font-semibold text-lg mb-4"><?php _e('Popular Categories', 'artsplans'); ?></h3>
                <div class="flex flex-wrap gap-2">
                    <?php 
                    $categories = artsplans_get_design_categories();
                    if ($categories && !is_wp_error($categories)):
                        foreach (array_slice($categories, 0, 10) as $category): ?>
                            <a href="<?php echo esc_url(get_term_link($category)); ?>" 
                               class="px-3 py-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-full text-xs transition-colors">
                                <?php echo esc_html($category->name); ?>
                            </a>
                        <?php endforeach;
                    endif; ?>
                </div>
            </div>

            <!-- Bottom Bar -->
            <div class="border-t border-gray-800 py-6">
                <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div class="text-sm text-gray-400">
                        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. <?php _e('All rights reserved.', 'artsplans'); ?></p>
                    </div>
                    
                    <nav class="flex flex-wrap items-center space-x-6 text-sm">
                        <a href="<?php echo esc_url(get_privacy_policy_url()); ?>" class="text-gray-400 hover:text-white transition-colors">
                            <?php _e('Privacy Policy', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('terms'))); ?>" class="text-gray-400 hover:text-white transition-colors">
                            <?php _e('Terms of Service', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('cookies'))); ?>" class="text-gray-400 hover:text-white transition-colors">
                            <?php _e('Cookie Policy', 'artsplans'); ?>
                        </a>
                        <a href="<?php echo esc_url(get_permalink(get_page_by_path('licensing'))); ?>" class="text-gray-400 hover:text-white transition-colors">
                            <?php _e('Licensing', 'artsplans'); ?>
                        </a>
                    </nav>

                    <!-- Language Switcher -->
                    <?php if (function_exists('pll_the_languages')): ?>
                        <div class="flex items-center space-x-2">
                            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9m0 9c2.485 0 4.5-4.03 4.5-9s-2.015-9-4.5-9m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9"></path>
                            </svg>
                            <div class="flex space-x-2">
                                <?php pll_the_languages(array(
                                    'dropdown' => 0,
                                    'show_flags' => 0,
                                    'show_names' => 1,
                                    'hide_current' => 0,
                                    'echo' => 1
                                )); ?>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>

        <!-- Scroll to Top Button -->
        <button id="scroll-to-top" 
                class="fixed bottom-6 right-6 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg opacity-0 pointer-events-none transition-all duration-300 z-40"
                onclick="scrollToTop()"
                aria-label="<?php _e('Scroll to top', 'artsplans'); ?>">
            <svg class="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
            </svg>
        </button>
    </footer>
</div><!-- #page -->

<?php wp_footer(); ?>

<script>
// Mobile menu toggle
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const openIcon = document.getElementById('mobile-menu-open');
    const closeIcon = document.getElementById('mobile-menu-close');
    
    menu.classList.toggle('hidden');
    openIcon.classList.toggle('hidden');
    closeIcon.classList.toggle('hidden');
}

// Search overlay toggle
function toggleSearch() {
    const overlay = document.getElementById('search-overlay');
    overlay.classList.toggle('hidden');
    
    if (!overlay.classList.contains('hidden')) {
        overlay.querySelector('input[name="s"]').focus();
    }
}

// Close search overlay when clicking outside
document.getElementById('search-overlay')?.addEventListener('click', function(e) {
    if (e.target === this) {
        toggleSearch();
    }
});

// Language menu toggle
function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// User menu toggle
function toggleUserMenu() {
    const menu = document.getElementById('user-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Close dropdowns when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.language-switcher')) {
        const langMenu = document.getElementById('language-menu');
        if (langMenu) langMenu.classList.add('hidden');
    }
    
    if (!e.target.closest('.user-menu')) {
        const userMenu = document.getElementById('user-menu');
        if (userMenu) userMenu.classList.add('hidden');
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const button = document.getElementById('scroll-to-top');
    if (button) {
        if (window.pageYOffset > 300) {
            button.classList.remove('opacity-0', 'pointer-events-none');
            button.classList.add('opacity-100');
        } else {
            button.classList.add('opacity-0', 'pointer-events-none');
            button.classList.remove('opacity-100');
        }
    }
});

// Newsletter signup
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form[action*="admin-ajax.php"]');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            
            fetch(this.action, {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('<?php _e("Thank you for subscribing!", "artsplans"); ?>');
                    this.reset();
                } else {
                    alert('<?php _e("Something went wrong. Please try again.", "artsplans"); ?>');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('<?php _e("Something went wrong. Please try again.", "artsplans"); ?>');
            });
        });
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close search overlay with Escape key
    if (e.key === 'Escape') {
        const overlay = document.getElementById('search-overlay');
        if (overlay && !overlay.classList.contains('hidden')) {
            toggleSearch();
        }
        
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
});
</script>

</body>
</html>

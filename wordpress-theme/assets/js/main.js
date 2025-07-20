/**
 * ArtsPlans Main JavaScript
 *
 * @package ArtsPlans
 */

(function($) {
    'use strict';

    // Document ready
    $(document).ready(function() {
        initializeComponents();
        setupEventListeners();
        setupAjaxSearch();
        setupScrollEffects();
    });

    /**
     * Initialize all components
     */
    function initializeComponents() {
        // Initialize tooltips if needed
        if (typeof $.fn.tooltip !== 'undefined') {
            $('[data-toggle="tooltip"]').tooltip();
        }

        // Initialize any other components
        setupImageLazyLoading();
        setupResponsiveIframes();
    }

    /**
     * Setup event listeners
     */
    function setupEventListeners() {
        // Mobile menu toggle
        $('.mobile-menu-toggle').on('click', function(e) {
            e.preventDefault();
            toggleMobileMenu();
        });

        // Search overlay toggle
        $('.search-toggle').on('click', function(e) {
            e.preventDefault();
            toggleSearchOverlay();
        });

        // Close overlays on escape
        $(document).on('keydown', function(e) {
            if (e.key === 'Escape') {
                closeAllOverlays();
            }
        });

        // Smooth scroll for anchor links
        $('a[href^="#"]').on('click', function(e) {
            const target = $(this.getAttribute('href'));
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 600);
            }
        });

        // Form submissions
        setupFormHandlers();
    }

    /**
     * Setup AJAX search functionality
     */
    function setupAjaxSearch() {
        let searchTimeout;
        const $searchInput = $('#live-search-input');
        const $searchResults = $('#live-search-results');

        if ($searchInput.length) {
            $searchInput.on('input', function() {
                const query = $(this).val().trim();
                
                clearTimeout(searchTimeout);
                
                if (query.length < 3) {
                    $searchResults.hide().empty();
                    return;
                }

                searchTimeout = setTimeout(function() {
                    performLiveSearch(query);
                }, 300);
            });
        }

        function performLiveSearch(query) {
            $.ajax({
                url: artsplans_ajax.ajax_url,
                type: 'POST',
                data: {
                    action: 'artsplans_search',
                    search_term: query,
                    nonce: artsplans_ajax.nonce
                },
                beforeSend: function() {
                    $searchResults.html('<div class="p-4 text-center text-gray-500">' + artsplans_ajax.strings.loading + '</div>').show();
                },
                success: function(response) {
                    if (response.success && response.data.length > 0) {
                        displaySearchResults(response.data);
                    } else {
                        $searchResults.html('<div class="p-4 text-center text-gray-500">' + artsplans_ajax.strings.no_results + '</div>');
                    }
                },
                error: function() {
                    $searchResults.html('<div class="p-4 text-center text-red-500">' + artsplans_ajax.strings.error + '</div>');
                }
            });
        }

        function displaySearchResults(results) {
            let html = '<div class="space-y-2">';
            
            results.forEach(function(item) {
                html += `
                    <a href="${item.permalink}" class="block p-3 hover:bg-gray-50 rounded-lg transition-colors">
                        <div class="flex items-center space-x-3">
                            ${item.thumbnail ? `<img src="${item.thumbnail}" alt="${item.title}" class="w-12 h-12 object-cover rounded">` : ''}
                            <div class="flex-1">
                                <h4 class="font-medium text-gray-900">${item.title}</h4>
                                <p class="text-sm text-gray-600">${item.excerpt}</p>
                                <div class="flex items-center space-x-4 mt-1">
                                    <span class="text-sm font-medium text-blue-600">${item.price}</span>
                                    <span class="text-xs text-gray-500">${item.download_count} downloads</span>
                                </div>
                            </div>
                        </div>
                    </a>
                `;
            });
            
            html += '</div>';
            $searchResults.html(html).show();
        }
    }

    /**
     * Setup scroll effects
     */
    function setupScrollEffects() {
        const $scrollToTop = $('#scroll-to-top');
        const $navbar = $('.site-header nav');

        $(window).on('scroll', function() {
            const scrollTop = $(this).scrollTop();

            // Show/hide scroll to top button
            if ($scrollToTop.length) {
                if (scrollTop > 300) {
                    $scrollToTop.removeClass('opacity-0 pointer-events-none').addClass('opacity-100');
                } else {
                    $scrollToTop.addClass('opacity-0 pointer-events-none').removeClass('opacity-100');
                }
            }

            // Add navbar shadow on scroll
            if ($navbar.length) {
                if (scrollTop > 10) {
                    $navbar.addClass('shadow-sm');
                } else {
                    $navbar.removeClass('shadow-sm');
                }
            }
        });

        // Scroll to top click handler
        $scrollToTop.on('click', function() {
            $('html, body').animate({ scrollTop: 0 }, 600);
        });
    }

    /**
     * Setup image lazy loading
     */
    function setupImageLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(function(img) {
                imageObserver.observe(img);
            });
        }
    }

    /**
     * Setup responsive iframes
     */
    function setupResponsiveIframes() {
        $('iframe').each(function() {
            const $iframe = $(this);
            if (!$iframe.parent().hasClass('iframe-container')) {
                $iframe.wrap('<div class="iframe-container relative overflow-hidden" style="padding-bottom: 56.25%; height: 0;"></div>');
                $iframe.addClass('absolute top-0 left-0 w-full h-full');
            }
        });
    }

    /**
     * Setup form handlers
     */
    function setupFormHandlers() {
        // Newsletter signup
        $('.newsletter-form').on('submit', function(e) {
            e.preventDefault();
            
            const $form = $(this);
            const $submitBtn = $form.find('button[type="submit"]');
            const originalText = $submitBtn.text();
            
            $.ajax({
                url: artsplans_ajax.ajax_url,
                type: 'POST',
                data: $form.serialize() + '&action=artsplans_newsletter_signup&nonce=' + artsplans_ajax.nonce,
                beforeSend: function() {
                    $submitBtn.prop('disabled', true).text(artsplans_ajax.strings.loading);
                },
                success: function(response) {
                    if (response.success) {
                        showNotification(artsplans_ajax.strings.newsletter_success || 'Thank you for subscribing!', 'success');
                        $form[0].reset();
                    } else {
                        showNotification(response.data || artsplans_ajax.strings.error, 'error');
                    }
                },
                error: function() {
                    showNotification(artsplans_ajax.strings.error, 'error');
                },
                complete: function() {
                    $submitBtn.prop('disabled', false).text(originalText);
                }
            });
        });

        // Contact forms
        $('.contact-form').on('submit', function(e) {
            e.preventDefault();
            handleContactForm($(this));
        });
    }

    /**
     * Handle contact form submission
     */
    function handleContactForm($form) {
        const $submitBtn = $form.find('button[type="submit"]');
        const originalText = $submitBtn.text();
        
        $.ajax({
            url: artsplans_ajax.ajax_url,
            type: 'POST',
            data: $form.serialize() + '&action=artsplans_contact_form&nonce=' + artsplans_ajax.nonce,
            beforeSend: function() {
                $submitBtn.prop('disabled', true).text(artsplans_ajax.strings.loading);
                $form.find('.form-message').remove();
            },
            success: function(response) {
                if (response.success) {
                    $form.prepend('<div class="form-message bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">' + (response.data || 'Message sent successfully!') + '</div>');
                    $form[0].reset();
                } else {
                    $form.prepend('<div class="form-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">' + (response.data || artsplans_ajax.strings.error) + '</div>');
                }
            },
            error: function() {
                $form.prepend('<div class="form-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">' + artsplans_ajax.strings.error + '</div>');
            },
            complete: function() {
                $submitBtn.prop('disabled', false).text(originalText);
            }
        });
    }

    /**
     * Show notification
     */
    function showNotification(message, type) {
        const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
        const notification = $(`
            <div class="fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 notification">
                ${message}
            </div>
        `);
        
        $('body').append(notification);
        
        setTimeout(function() {
            notification.fadeOut(300, function() {
                $(this).remove();
            });
        }, 5000);
    }

    /**
     * Toggle mobile menu
     */
    function toggleMobileMenu() {
        const $menu = $('#mobile-menu');
        const $openIcon = $('#mobile-menu-open');
        const $closeIcon = $('#mobile-menu-close');
        
        $menu.toggleClass('hidden');
        $openIcon.toggleClass('hidden');
        $closeIcon.toggleClass('hidden');
    }

    /**
     * Toggle search overlay
     */
    function toggleSearchOverlay() {
        const $overlay = $('#search-overlay');
        $overlay.toggleClass('hidden');
        
        if (!$overlay.hasClass('hidden')) {
            $overlay.find('input[name="s"]').focus();
        }
    }

    /**
     * Close all overlays
     */
    function closeAllOverlays() {
        $('#search-overlay').addClass('hidden');
        $('#mobile-menu').addClass('hidden');
        $('#mobile-menu-open').removeClass('hidden');
        $('#mobile-menu-close').addClass('hidden');
        $('.dropdown-menu').addClass('hidden');
    }

    /**
     * Favorites functionality
     */
    window.toggleFavorite = function(postId) {
        if (!artsplans_ajax.user_logged_in) {
            showNotification('Please log in to add favorites', 'error');
            return;
        }

        $.ajax({
            url: artsplans_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'artsplans_toggle_favorite',
                post_id: postId,
                nonce: artsplans_ajax.nonce
            },
            success: function(response) {
                if (response.success) {
                    const $favoriteBtn = $(`[onclick="toggleFavorite(${postId})"] svg`);
                    if (response.data.is_favorite) {
                        $favoriteBtn.addClass('text-red-500 fill-current');
                        showNotification('Added to favorites', 'success');
                    } else {
                        $favoriteBtn.removeClass('text-red-500 fill-current');
                        showNotification('Removed from favorites', 'success');
                    }
                } else {
                    showNotification(response.data || 'Error updating favorites', 'error');
                }
            },
            error: function() {
                showNotification('Error updating favorites', 'error');
            }
        });
    };

    /**
     * Cart functionality
     */
    window.addToCart = function(postId) {
        $.ajax({
            url: artsplans_ajax.ajax_url,
            type: 'POST',
            data: {
                action: 'artsplans_add_to_cart',
                post_id: postId,
                nonce: artsplans_ajax.nonce
            },
            beforeSend: function() {
                // Add loading state to button
                const $btn = $(`[onclick="addToCart(${postId})"]`);
                $btn.prop('disabled', true).html('<svg class="animate-spin w-5 h-5" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Adding...');
            },
            success: function(response) {
                if (response.success) {
                    showNotification('Added to cart successfully!', 'success');
                    // Update cart count in header
                    updateCartCount(response.data.cart_count);
                } else {
                    showNotification(response.data || 'Error adding to cart', 'error');
                }
            },
            error: function() {
                showNotification('Error adding to cart', 'error');
            },
            complete: function() {
                // Restore button state
                const $btn = $(`[onclick="addToCart(${postId})"]`);
                $btn.prop('disabled', false).html('<svg class="w-5 h-5 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13v6a2 2 0 002 2h4m0-8h6m-6 0a2 2 0 00-2 2v2m0 0a2 2 0 002 2h2a2 2 0 002-2v-2m-4 0h4"></path></svg> Add to Cart');
            }
        });
    };

    /**
     * Update cart count in header
     */
    function updateCartCount(count) {
        $('.cart-count').text(count);
        if (count > 0) {
            $('.cart-badge').removeClass('hidden');
        } else {
            $('.cart-badge').addClass('hidden');
        }
    }

    /**
     * Initialize animations on scroll
     */
    function initializeScrollAnimations() {
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
                animationObserver.observe(el);
            });
        }
    }

    // Initialize scroll animations
    initializeScrollAnimations();

    /**
     * Global utility functions
     */
    window.ArtsPlans = {
        showNotification: showNotification,
        closeAllOverlays: closeAllOverlays,
        toggleMobileMenu: toggleMobileMenu,
        toggleSearchOverlay: toggleSearchOverlay
    };

})(jQuery);

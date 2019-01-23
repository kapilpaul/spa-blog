/*!
 * Version: 1.2 Development
 */

var $ = require('jquery');

var slidebars = function () {

  /**
   * Setup
   */

    // Cache all canvas elements
  var canvas = $( '[data-canvas]' ),

    // Object of Slidebars
    offCanvas = {},

    // Variables, permitted sides and styles
    init = false,
    registered = false,
    sides = [ 'top', 'right', 'bottom', 'left' ],
    styles = [ 'reveal', 'push', 'overlay', 'shift' ],

    /**
     * Get Animation Properties
     */

    getAnimationProperties = function ( id ) {
      // Variables
      var elements = $(),
        amount = '0px, 0px',
        duration = parseFloat( offCanvas[ id ].element.css( 'transitionDuration' ), 10 ) * 1000;

      // Elements to animate
      if ( offCanvas[ id ].style === 'reveal' || offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'shift' ) {
        elements = elements.add( canvas );
      }

      if ( offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'overlay' || offCanvas[ id ].style === 'shift' ) {
        elements = elements.add( offCanvas[ id ].element );
      }

      // Amount to animate
      if ( offCanvas[ id ].active ) {
        if ( offCanvas[ id ].side === 'top' ) {
          amount = '0px, ' + offCanvas[ id ].element.css( 'height' );
        } else if ( offCanvas[ id ].side === 'right' ) {
          amount = '-' + offCanvas[ id ].element.css( 'width' ) + ', 0px';
        } else if ( offCanvas[ id ].side === 'bottom' ) {
          amount = '0px, -' + offCanvas[ id ].element.css( 'height' );
        } else if ( offCanvas[ id ].side === 'left' ) {
          amount = offCanvas[ id ].element.css( 'width' ) + ', 0px';
        }
      }

      // Return animation properties
      return { 'elements': elements, 'amount': amount, 'duration': duration };
    },

    /**
     * Slidebars Registration
     */

    registerSlidebar = function ( id, side, style, element ) {
      // Check if Slidebar is registered
      if ( isRegisteredSlidebar( id ) ) {
        throw "Error registering Slidebar, a Slidebar with id '" + id + "' already exists.";
      }

      // Register the Slidebar
      offCanvas[ id ] = {
        'id': id,
        'side': side,
        'style': style,
        'element': element,
        'active': false
      };
    },

    isRegisteredSlidebar = function ( id ) {
      // Return if Slidebar is registered
      if ( offCanvas.hasOwnProperty( id ) ) {
        return true;
      } else {
        return false;
      }
    };

  /**
   * Initialization
   */

  this.init = function ( callback ) {
    // Check if Slidebars has been initialized
    if ( init ) {
      throw "Slidebars has already been initialized.";
    }

    // Loop through and register Slidebars
    if ( ! registered ) {
      $( '[data-off-canvas]' ).each( function () {
        // Get Slidebar parameters
        var parameters = $( this ).data( 'off-canvas' ).split( ' ', 3 );
        //console.log(parameters);
        // Make sure a valid id, side and style are specified
        if ( ! parameters || ! parameters[ 0 ] || sides.indexOf( parameters[ 1 ] ) === -1 || styles.indexOf( parameters[ 2 ] ) === -1 ) {
          throw "Error registering Slidebar, please specifiy a valid id, side and style'.";
        }

        // Register Slidebar
        registerSlidebar( parameters[ 0 ], parameters[ 1 ], parameters[ 2 ], $( this ) );
      } );

      // Set registered variable
      registered = true;
    }

    // Set initialized variable
    init = true;

    // Set CSS
    this.css();

    // Trigger event
    $( events ).trigger( 'init' );

    // Run callback
    if ( typeof callback === 'function' ) {
      callback();
    }
  };

  this.exit = function ( callback ) {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Exit
    var exit = function () {
      // Set init variable
      init = false;

      // Trigger event
      $( events ).trigger( 'exit' );

      // Run callback
      if ( typeof callback === 'function' ) {
        callback();
      }
    };

    // Call exit, close open Slidebar if active
    if ( this.getActiveSlidebar() ) {
      this.close( exit );
    } else {
      exit();
    }
  };

  /**
   * CSS
   */

  this.css = function ( callback ) {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Loop through Slidebars to set negative margins
    for ( var id in offCanvas ) {
      // Check if Slidebar is registered
      if ( isRegisteredSlidebar( id ) ) {
        // Calculate offset
        var offset;

        if ( offCanvas[ id ].side === 'top' || offCanvas[ id ].side === 'bottom' ) {
          offset = offCanvas[ id ].element.css( 'height' );
        } else {
          offset = offCanvas[ id ].element.css( 'width' );
        }

        // Apply negative margins
        if ( offCanvas[ id ].style === 'push' || offCanvas[ id ].style === 'overlay' || offCanvas[ id ].style === 'shift' ) {
          offCanvas[ id ].element.css( 'margin-' + offCanvas[ id ].side, '-' + offset );
        }
      }
    }

    // Reposition open Slidebars
    if ( this.getActiveSlidebar() ) {
      this.open( this.getActiveSlidebar() );
    }

    // Trigger event
    $( events ).trigger( 'css' );

    // Run callback
    if ( typeof callback === 'function' ) {
      callback();
    }
  };

  /**
   * Controls
   */

  this.open = function ( id, callback ) {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Check if id wasn't passed
    if ( ! id ) {
      throw "You must pass a Slidebar id.";
    }

    // Check if Slidebar is registered
    if ( ! isRegisteredSlidebar( id ) ) {
      throw "Error opening Slidebar, there is no Slidebar with id '" + id + "'.";
    }

    // Open
    var open = function () {
      // Set active state to true
      offCanvas[ id ].active = true;

      // Display the Slidebar
      offCanvas[ id ].element.css( 'display', 'block' );

      // Trigger event
      $( events ).trigger( 'opening', [ offCanvas[ id ].id ] );

      // Get animation properties
      var animationProperties = getAnimationProperties( id );

      // Apply css
      animationProperties.elements.css( {
        'transition-duration': animationProperties.duration + 'ms',
        'transform': 'translate(' + animationProperties.amount + ')'
      } );

      // Transition completed
      setTimeout( function () {
        // Trigger event
        $( events ).trigger( 'opened', [ offCanvas[ id ].id ] );

        // Run callback
        if ( typeof callback === 'function' ) {
          callback();
        }
      }, animationProperties.duration );
    };

    // Call open, close open Slidebar if active
    if ( this.getActiveSlidebar() && this.getActiveSlidebar() !== id ) {
      this.close( open );
    } else {
      open();
    }
  };

  this.close = function ( id, callback ) {
    // Shift callback arguments
    if ( typeof id === 'function' ) {
      callback = id;
      id = null;
    }

    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Check if id was passed but isn't a registered Slidebar
    if ( id && ! isRegisteredSlidebar( id ) ) {
      throw "Error closing Slidebar, there is no Slidebar with id '" + id + "'.";
    }

    // If no id was passed, get the active Slidebar
    if ( ! id ) {
      id = this.getActiveSlidebar();
    }

    // Close a Slidebar
    if ( id && offCanvas[ id ].active ) {
      // Set active state to false
      offCanvas[ id ].active = false;

      // Trigger event
      $( events ).trigger( 'closing', [ offCanvas[ id ].id ] );

      // Get animation properties
      var animationProperties = getAnimationProperties( id );

      // Apply css
      animationProperties.elements.css( 'transform', '' );

      // Transition completetion
      setTimeout( function () {
        // Remove transition duration
        animationProperties.elements.css( 'transition-duration', '' );

        // Hide the Slidebar
        offCanvas[ id ].element.css( 'display', '' );

        // Trigger event
        $( events ).trigger( 'closed', [ offCanvas[ id ].id ] );

        // Run callback
        if ( typeof callback === 'function' ) {
          callback();
        }
      }, animationProperties.duration );
    }
  };

  this.toggle = function ( id, callback ) {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Check if id wasn't passed
    if ( ! id ) {
      throw "You must pass a Slidebar id.";
    }

    // Check if Slidebar is registered
    if ( ! isRegisteredSlidebar( id ) ) {
      throw "Error toggling Slidebar, there is no Slidebar with id '" + id + "'.";
    }

    // Check Slidebar state
    if ( offCanvas[ id ].active ) {
      // It's open, close it
      this.close( id, function () {
        // Run callback
        if ( typeof callback === 'function' ) {
          callback();
        }
      } );
    } else {
      // It's closed, open it
      this.open( id, function () {
        // Run callback
        if ( typeof callback === 'function' ) {
          callback();
        }
      } );
    }
  };

  /**
   * Active States
   */

  this.isActive = function () {
    // Return init state
    return init;
  };

  this.isActiveSlidebar = function ( id ) {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Check if id wasn't passed
    if ( ! id ) {
      throw "You must provide a Slidebar id.";
    }

    // Check if Slidebar is registered
    if ( ! isRegisteredSlidebar( id ) ) {
      throw "Error retrieving Slidebar, there is no Slidebar with id '" + id + "'.";
    }

    // Return the active state
    return offCanvas[ id ].active;
  };

  this.getActiveSlidebar = function () {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Variable to return
    var active = false;

    // Loop through Slidebars
    for ( var id in offCanvas ) {
      // Check if Slidebar is registered
      if ( isRegisteredSlidebar( id ) ) {
        // Check if it's active
        if ( offCanvas[ id ].active ) {
          // Set the active id
          active = offCanvas[ id ].id;
          break;
        }
      }
    }
    //console.log(active);
    // Return
    return active;

  };

  this.getSlidebars = function () {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Create an array for the Slidebars
    var slidebarsArray = [];

    // Loop through Slidebars
    for ( var id in offCanvas ) {
      // Check if Slidebar is registered
      if ( isRegisteredSlidebar( id ) ) {
        // Add Slidebar id to array
        slidebarsArray.push( offCanvas[ id ].id );
      }
    }

    // Return
    return slidebarsArray;
  };

  this.getSlidebar = function ( id ) {
    // Check if Slidebars has been initialized
    if ( ! init ) {
      throw "Slidebars hasn't been initialized.";
    }

    // Check if id wasn't passed
    if ( ! id ) {
      throw "You must pass a Slidebar id.";
    }

    // Check if Slidebar is registered
    if ( ! isRegisteredSlidebar( id ) ) {
      throw "Error retrieving Slidebar, there is no Slidebar with id '" + id + "'.";
    }

    // Return the Slidebar's properties
    return offCanvas[ id ];
  };

  /**
   * Events
   */

  this.events = {};
  var events = this.events;

  /**
   * Resizes
   */

  $( window ).on( 'resize', this.css.bind( this ) );
};

(function ($) {

  'use strict'

  var Core = {
    initialized: false,
    initialize: function () {
      if (this.initialized) {
        return
      }
      this.initialized = true
      this.build()
    },
    build: function () {
      this.fixedHeader()
      // Init toggle menu
      this.initToggleMenu()
      // Search
      this.initSearchModal()
      // Dropdown menu
      this.dropdownhover()

    },

    initSearchModal: function (options) {

      $(document).on('click', '.btn_header_search', function (event) {
        event.preventDefault()

        $('.header-search').addClass('open')
      })
      $(document).on('click', '.search-form_close , .search-close', function (event) {
        event.preventDefault()
        $('.header-search').removeClass('open')
      })

    },

    initToggleMenu: function () {

      $('.toggle-menu-button').each(function (i) {
        var trigger = $(this)
        var isClosed = true

        function showMenu () {

          $('#nav').addClass('navbar-scrolling-fixing')

          if (trigger.hasClass('js-toggle-screen')) {

            $('#fixedMenu').delay(0).fadeIn(300)

          }

          trigger.addClass('is-open')
          isClosed = false
        }

        function hideMenu () {
          $('#fixedMenu').fadeOut(100)
          $('#nav').removeClass('navbar-scrolling-fixing')
          trigger.removeClass('is-open')
          isClosed = true
        }

        $('.fullmenu-close').on('click', function (e) {
          e.preventDefault()
          if (isClosed === true) {
            //hideMenu();
          } else {
            hideMenu()
          }
        })

        trigger.on('click', function (e) {
          e.preventDefault()
          if (isClosed === true) {
            showMenu()
          } else {
            hideMenu()
          }
        })

        $('.fw-close').on('click', function (e) {
          e.preventDefault()
          if (isClosed === true) {
            showMenu()
          } else {
            hideMenu()
          }
        })

      })
    },

    dropdownhover: function (options) {
      /** Extra script for smoother navigation effect **/
      if ($(window).width() > 798) {
        $('.yamm').on('mouseenter', '.navbar-nav > .dropdown', function () {
          'use strict'
          $(this).addClass('open')
        }).on('mouseleave', '.navbar-nav > .dropdown', function () {
          'use strict'
          $(this).removeClass('open')
        })
      }
    },

    fixedHeader: function (options) {
      if ($(window).width() > 767) {
        // Fixed Header
        var topOffset = $(window).scrollTop()
        if (topOffset > 0) {
          $('.header').addClass('navbar-scrolling')
        }
        $(window).on('scroll', function () {
          var fromTop = $(this).scrollTop()
          if (fromTop > 0) {
            $('body').addClass('fixed-header')
            $('.header').addClass('navbar-scrolling')
          } else {
            $('body').removeClass('fixed-header')
            $('.header').removeClass('navbar-scrolling')
          }

        })
      }
    },

  }
  Core.initialize()

  /////////////////////////////////////////////////////////////////
  //   Dropdown Menu Fade
  /////////////////////////////////////////////////////////////////

  $('#dl-menu').dlmenu()

  $('.yamm >li').hover(
    function () {
      $('.dropdown-menu', this).fadeIn('fast')
    },
    function () {
      $('.dropdown-menu', this).fadeOut('fast')
    })

  window.prettyPrint && prettyPrint()
  $(document).on('click', '.yamm .dropdown-menu', function (e) {
    e.stopPropagation()
  })

  // Create a new instance of Slidebars
  // var slidebars = require('./slidebar.js')
  // console.log(slidebars)
  var controller = new slidebars()

  // Events
  $(controller.events).on('init', function () {
    //console.log( 'Init event' );
  })

  $(controller.events).on('exit', function () {
    //console.log( 'Exit event' );
  })

  $(controller.events).on('css', function () {
    //console.log( 'CSS event' );
  })

  $(controller.events).on('opening', function (event, id) {
    //console.log( 'Opening event of slidebar with id ' + id );
  })

  $(controller.events).on('opened', function (event, id) {
    //console.log( 'Opened event of slidebar with id ' + id );
  })

  $(controller.events).on('closing', function (event, id) {
    //console.log( 'Closing event of slidebar with id ' + id );
  })

  $(controller.events).on('closed', function (event, id) {
    //console.log( 'Closed event of slidebar with id ' + id );
  })

  // Initialize Slidebars
  controller.init()

  // Panel nav  Slidebar controls

  $('.js-open-slidebar-panel-left').on('click', function (event) {
    event.preventDefault()
    event.stopPropagation()
    controller.toggle('slidebar-panel-left')
  })

  // Left Slidebar controls
  $('.js-open-left-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.open('slidebar-1')
  })

  $('.js-close-left-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.close('slidebar-1')
  })

  $('.js-toggle-left-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.toggle('slidebar-1')
  })

  // Right Slidebar controls
  $('.js-open-right-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.open('slidebar-2')
  })

  $('.js-close-right-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.close('slidebar-2')
  })

  $('.js-toggle-right-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.toggle('slidebar-2')
  })

  // Top Slidebar controls
  $('.js-open-top-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.open('slidebar-3')
  })

  $('.js-close-top-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.close('slidebar-3')
  })

  $('.js-toggle-top-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.toggle('slidebar-3')
  })

  // Bottom Slidebar controls
  $('.js-open-bottom-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.open('slidebar-4')
  })

  $('.js-close-bottom-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.close('slidebar-4')
  })

  $('.js-toggle-bottom-slidebar').on('click', function (event) {
    event.stopPropagation()
    controller.toggle('slidebar-4')
  })

  // Close any
  $(controller.events).on('opened', function () {
    $('[data-canvas="container"]').addClass('js-close-any-slidebar')
    $('.toggle-menu-button').addClass('is-open')
  })

  $(controller.events).on('closed', function () {
    $('[data-canvas="container"]').removeClass('js-close-any-slidebar')
    $('.toggle-menu-button').removeClass('is-open')
  })

  $('body').on('click', '.js-close-any-slidebar', function (event) {
    event.stopPropagation()
    controller.close()
  })

  // Initilize, exit and css reset
  $('.js-initialize-slidebars').on('click', function (event) {
    event.stopPropagation()
    controller.init()
  })

  $('.js-exit-slidebars').on('click', function (event) {
    event.stopPropagation()
    controller.exit()
  })

  $('.js-reset-slidebars-css').on('click', function (event) {
    event.stopPropagation()
    controller.css()
  })

  // Is and get
  $('.js-is-active').on('click', function (event) {
    event.stopPropagation()
    //console.log( controller.isActive() );
  })

  $('.js-is-active-slidebar').on('click', function (event) {
    event.stopPropagation()
    var id = prompt('Enter a Slidebar id')
    //console.log( controller.isActiveSlidebar( id ) );
  })

  $('.js-get-active-slidebar').on('click', function (event) {
    event.stopPropagation()
    //console.log( controller.getActiveSlidebar() );
  })

  $('.js-get-all-slidebars').on('click', function (event) {
    event.stopPropagation()
    //console.log( controller.getSlidebars() );

  })

  $('.js-get-slidebar').on('click', function (event) {
    event.stopPropagation()
    var id = prompt('Enter a Slidebar id')
    //console.log( controller.getSlidebar( id ) );
  })

  // Callbacks
  $('.js-init-callback').on('click', function (event) {
    event.stopPropagation()
    controller.init(function () {
      //console.log( 'Init callback' );
    })
  })

  $('.js-exit-callback').on('click', function (event) {
    event.stopPropagation()
    controller.exit(function () {
      //console.log( 'Exit callback' );
    })
  })

  $('.js-css-callback').on('click', function (event) {
    event.stopPropagation()
    controller.css(function () {
      //console.log( 'CSS callback' );
    })
  })

  $('.js-open-callback').on('click', function (event) {
    event.stopPropagation()
    controller.open('slidebar-1', function () {
      //console.log( 'Open callback' );
    })
  })

  $('.js-close-callback').on('click', function (event) {
    event.stopPropagation()
    controller.close(function () {
      //console.log( 'Close callback' );
    })
  })

  $('.js-toggle-callback').on('click', function (event) {
    event.stopPropagation()
    controller.toggle('slidebar-1', function () {
      //console.log( 'Toggle callback' );
    })
  })

})(require('jquery'));






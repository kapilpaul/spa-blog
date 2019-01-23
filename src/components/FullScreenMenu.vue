<template>
    <div class="wrap-fixed-menu" id="fixedMenu">
        <button type="button" class="fullmenu-close"><i class="fa fa-times"></i></button>

        <nav class="fullscreen-center-menu">
            <div id="dl-menu" class="dl-menuwrapper">
                <ul class="dl-menu menu-item list-unstyled">
                    <li class="has-children ">
                        <a href="#"><span>Home <i class="arrow_carrot-right"></i> </span></a>
                        <ul class="dl-submenu">
                            <li><a href="#"><span>Home 1</span></a></li>
                            <li><a href="#"><span>Home 2</span></a></li>
                        </ul>
                    </li>
                    <li><a href="#"><span>About</span></a></li>

                    <li>
                        <a href="#"><span>services</span></a>
                    </li>

                    <li class="has-children">
                        <a href="#"><span> Portfolio <i class="arrow_carrot-right"></i> </span></a>
                        <ul class="dl-submenu">
                            <li><a href="#"><span>Portfolio 1</span></a></li>
                            <li><a href="#"><span>Portfolio 2 </span></a></li>
                            <li><a href="#"><span>Portfolio 3</span></a></li>
                            <li><a href="#"><span>Portfolio 4 </span></a></li>
                            <li><a href="#"><span>Details </span></a></li>
                        </ul>
                    </li>
                    <li class="has-children">
                        <a href="#"><span> Blog <i class="arrow_carrot-right"></i> </span></a>
                        <ul class="dl-submenu">
                            <li><a href="#"><span>Blog main</span></a></li>
                            <li><a href="#"><span>Blog main 2</span></a></li>
                            <li><a href="#"><span>Blog post </span></a></li>
                        </ul>
                    </li>
                    <li><a href="#"><span>typography</span></a></li>
                    <li><a href="#"><span>info-page</span></a></li>
                    <li><a href="#"><span>contact</span></a></li>
                </ul>
            </div>

            <form class="header-form">
                <input class="header-form__input" type="email" placeholder="Get the Newsletter ..."/>
                <button class="header-form__btn"><i class="icon fa fa-envelope-o"></i></button>
            </form>
        </nav>
    </div>
</template>

<script>
// import '@/assets/plugins/headers/jquery.dlmenu.js'
export default {}
</script>

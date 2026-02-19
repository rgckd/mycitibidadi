<?php
/**
 * Header Component
 * Reusable header for all pages
 * @param string $current_page - Current page identifier (home, owners, initiatives)
 */

require_once __DIR__ . '/config.php';

$current_page = isset($current_page) ? $current_page : 'home';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title><?php echo SITE_TITLE; ?></title>
	<meta name="author" content="<?php echo SITE_NAME; ?>">
	<meta name="description" content="<?php echo SITE_DESCRIPTION; ?>">
	<meta name="keywords" content="<?php echo SITE_KEYWORDS; ?>">
	<!-- Mobile Specific Meta -->
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" href="<?php echo LOGO_PATH; ?>" type="image/x-icon">
	<link rel="stylesheet" href="assets/css/owl.carousel.css">
	<link rel="stylesheet" href="assets/css/fontawesome-all.css">
	<link rel="stylesheet" href="assets/css/flaticon.css">
	<link rel="stylesheet" href="assets/css/animate.css">
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/video.min.css">
	<link rel="stylesheet" href="assets/css/it-source.css">
</head>

<body class="s-it" data-spy="scroll" data-target=".it-up-main-navigation" data-offset="80">
	<div id="preloader"></div>
	<div class="up">
		<a href="<?php echo SITE_URL; ?>" class="scrollup text-center"><i class="fas fa-chevron-up"></i></a>
	</div>
<!-- Start of header section
	============================================= -->
	<header id="it-header-up" class="it-header-up-seaction">
		<div class="it-header-up-top clearfix"> 
			<div class="container">
				<div class="it-header-top-cta float-left">
					<a href="mailto:<?php echo CONTACT_EMAIL; ?>"><i class="fas fa-envelope"></i> <?php echo CONTACT_EMAIL; ?></a>
					<a href="tel:<?php echo str_replace(['+', ' '], '', CONTACT_PHONE); ?>"><i class="fas fa-phone"></i> <?php echo CONTACT_PHONE; ?></a>
					<a href="<?php echo MAPS_URL; ?>" target="_blank" rel="noopener noreferrer"><i class="fas fa-map-marker-alt"></i> <?php echo CONTACT_ADDRESS; ?></a>
				</div>
				<div class="it-header-top-social float-right">
					<a href="<?php echo SOCIAL_FACEBOOK; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a>
					<a href="<?php echo SOCIAL_TWITTER; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a>
					<a href="<?php echo SOCIAL_INSTAGRAM; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
					<a href="<?php echo SOCIAL_YOUTUBE; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
					<a href="<?php echo SOCIAL_THREADS; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-threads"></i></a>
				</div>
			</div>
		</div>
		<div class="it-up-header-main">
			<div class="container">
				<div class="it-up-brand-logo float-left">
					<a href="<?php echo SITE_URL; ?>"><img src="<?php echo LOGO_PATH; ?>" alt="<?php echo SITE_NAME; ?>" style="width:<?php echo LOGO_WIDTH; ?>;height:<?php echo LOGO_HEIGHT; ?>; border:0;"></a>
				</div>
				<div class="it-up-main-menu-wrap clearfix">
					<nav class="it-up-main-navigation float-left ul-li">
						<ul id="main-nav" class="navbar-nav text-capitalize clearfix">
							<?php if ($current_page === 'home'): ?>
								<li><a class="nav-link" href="#it-up-service">About Us</a></li>
							<?php else: ?>
								<li><a class="nav-link" href="<?php echo SITE_URL; ?>#it-up-service">About Us</a></li>
							<?php endif; ?>
							
							<li><?php echo $current_page === 'owners' ? '<u><b>Owners</b></u>' : '<a class="nav-link" href="owners">Owners</a>'; ?></li>
							<li><?php echo $current_page === 'initiatives' ? '<u><b>Projects</b></u>' : '<a class="nav-link" href="initiatives">Projects</a>'; ?></li>
							
							<?php if ($current_page === 'home'): ?>
								<li><a class="nav-link" href="#it-up-testimonial">Association</a></li>
							<?php else: ?>
								<li><a class="nav-link" href="<?php echo SITE_URL; ?>#it-up-testimonial">Association</a></li>
							<?php endif; ?>
							
							<li><a class="nav-link" href="gallery.php">Gallery</a></li>
							
							<?php if ($current_page === 'home'): ?>
								<li><a class="nav-link" href="#it-up-contact">Contact Us</a></li>
							<?php else: ?>
								<li><a class="nav-link" href="<?php echo SITE_URL; ?>#it-up-contact">Contact Us</a></li>
							<?php endif; ?>
						</ul>
					</nav>
					<div class="it-up-header-cta-btn float-right text-center">
						<a href="<?php echo UPDATES_URL; ?>">News Updates</a>
					</div>
				</div>
				<div class="mobile_menu relative-position">
					<div class="mobile_menu_button it-up-open_mobile_menu">
						<i class="fas fa-bars"></i>
					</div>
					<div class="it-up-mobile_menu_wrap">
						<div class="mobile_menu_overlay it-up-open_mobile_menu"></div>
						<div class="mobile_menu_content">
							<div class="mobile_menu_close it-up-open_mobile_menu">
								<i class="far fa-times-circle"></i>
							</div>
							<div class="m-brand-logo text-center">
								<a href="<?php echo SITE_URL; ?>"><img src="<?php echo LOGO_PATH; ?>" style="width:<?php echo LOGO_WIDTH; ?>;height:<?php echo LOGO_HEIGHT; ?>"></a>
							</div>
							<nav class="main-navigation mobile_menu-dropdown clearfix ul-li">
								<ul id="main-nav" class="navbar-nav text-capitalize clearfix">
									<li><a class="nav-link" href="<?php echo SITE_URL; ?>">Home</a></li>
									<li><a class="nav-link" href="<?php echo SITE_URL; ?>#it-up-service">About Us</a></li>
									<li><a class="nav-link" href="<?php echo SITE_URL; ?>owners">Owners</a></li>
									<li><a class="nav-link" href="<?php echo SITE_URL; ?>initiatives">Projects</a></li>
									<li><a class="nav-link" href="<?php echo SITE_URL; ?>#it-up-testimonial">Association</a></li>
									<li><a class="nav-link" href="gallery.php">Gallery</a></li>
									<li><a class="nav-link" href="<?php echo SITE_URL; ?>#it-up-contact">Contact Us</a></li>
									<li><a class="nav-link" href="<?php echo UPDATES_URL; ?>" target="_blank">Updates</a></li>
								</ul>
							</nav>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
<!-- End of header section
	============================================= -->

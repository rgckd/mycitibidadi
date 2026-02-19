<?php
/**
 * Footer Component
 * Reusable footer for all pages
 */

require_once __DIR__ . '/config.php';
global $instagram_posts;
?>
<!-- Start of footer section
	============================================= -->
	<section id="it-up-footer" class="it-up-footer-section position-relative">
		<div class="container">
			<div class="it-up-footer-content-wrap">
				<div class="row">
					<div class="col-lg-3 col-md-6">
						<div class="it-up-footer-widget headline-1 pera-content">
							<div class="it-up-footer-logo-widget it-up-headline pera-content">
								<div class="it-up-footer-logo">
									<a href="<?php echo SITE_URL; ?>"><img src="<?php echo LOGO_PATH; ?>" style="width:<?php echo LOGO_WIDTH; ?>;height:<?php echo LOGO_HEIGHT; ?>" alt="<?php echo SITE_NAME; ?>"></a>
								</div>
								<p><?php echo SITE_DESCRIPTION; ?></p>
								<a class="footer-logo-btn text-center text-capitalize" href="<?php echo SITE_URL; ?>#it-up-contact">Get In Touch <i class="fas fa-arrow-right"></i></a>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="it-up-footer-widget headline-1 pera-content">
							<div class="it-up-footer-newslatter-widget pera-content">
								<h3 class="widget-title">Social Media</h3>
								<div class="it-up-footer-social ul-li">
									<ul>
										<li><a href="<?php echo SOCIAL_FACEBOOK; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f"></i></a></li>
										<li><a href="<?php echo SOCIAL_TWITTER; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter"></i></a></li>
										<li><a href="<?php echo SOCIAL_INSTAGRAM; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a></li>
										<li><a href="<?php echo SOCIAL_YOUTUBE; ?>" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="it-up-footer-widget headline-1 pera-content">
							<div class="it-up-footer-info-widget ul-li">
								<h3 class="widget-title">Official info:</h3>
								<ul>
									<li>
										<i class="fas fa-map-marker-alt"></i> 
										<a href="<?php echo MAPS_URL; ?>" target="_blank" rel="noopener noreferrer"><?php echo CONTACT_FULL_ADDRESS; ?></a>
									</li>
									<li>
										<i class="fas fa-phone"></i><a href="tel:<?php echo str_replace(['+', ' '], '', CONTACT_PHONE); ?>"><?php echo CONTACT_PHONE_DISPLAY; ?></a>
									</li>
								</ul>
								<div class="office-open-hour">
									<span>Open Hours: </span>
									<p><?php echo OFFICE_HOURS; ?></p>
								</div>
							</div>
						</div>
					</div>
					<div class="col-lg-3 col-md-6">
						<div class="it-up-footer-widget headline-1 pera-content">
							<div class="it-up-footer-instagram-widget">
								<h3 class="widget-title">Instagram</h3>
								<div class="insta-feed ul-li clearfix">
									<ul>
										<?php for ($i = 0; $i < 6; $i++): ?>
											<li><a href="<?php echo $instagram_posts[$i]; ?>" target="_blank" rel="noopener noreferrer"><img src="assets/img/ins<?php echo $i + 1; ?>.jpg" alt="Instagram Post"><i class="fab fa-instagram"></i></a></li>
										<?php endfor; ?>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="it-up-footer-copyright text-center pera-content">
			<div class="container">
				<p>© 2006 - <?php echo date('Y'); ?> <?php echo SITE_NAME; ?>. All rights reserved.</p>
			</div>
		</div>
	</section>
<!-- End of footer section
	============================================= -->

	<!-- For Js Library -->
	<script src="assets/js/jquery.js"></script>
	<script src="assets/js/bootstrap.min.js"></script>
	<script src="assets/js/popper.min.js"></script>
	<script src="assets/js/owl.js"></script>
	<script src="assets/js/jquery.magnific-popup.min.js"></script>
	<script src="assets/js/appear.js"></script>
	<script src="assets/js/wow.min.js"></script>
	<script src="assets/js/parallax-scroll.js"></script>
	<script src="assets/js/circle-progress.js"></script>
	<script src="assets/js/pagenav.js"></script>
	<script src="assets/js/jquery.counterup.min.js"></script>
	<script src="assets/js/waypoints.min.js"></script>
	<script src="assets/js/typer-new.js"></script>
	<script src="assets/js/it-source.js"></script>
</body>
</html>

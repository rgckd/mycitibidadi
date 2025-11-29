/**
 * Custom JavaScript Functions
 * Extracted common functions for reusability
 */

// Toggle owner fields visibility in contact form
function toggleOwnerFields() {
	const isOwner = document.getElementById('isOwnerSelect').value;
	const ownerFields = document.getElementById('ownerFields');
	const plotNumbers = document.getElementById('plotNumbers');
	const phases = document.getElementById('phases');
	
	if (isOwner === 'Yes') {
		ownerFields.style.display = 'block';
		plotNumbers.required = true;
		phases.required = true;
	} else {
		ownerFields.style.display = 'none';
		plotNumbers.required = false;
		phases.required = false;
		plotNumbers.value = '';
		phases.value = '';
	}
}

// Form submission modal handlers
function closeFormModal() {
	$('#formSuccessModal, #formErrorModal').fadeOut(300, function() {
		$(this).remove();
	});
}

// Initialize form confirmation modals
function initFormModals() {
	$(document).ready(function() {
		const urlParams = new URLSearchParams(window.location.search);
		const message = urlParams.get('message');
		
		if (message === 'Successfull') {
			const successHtml = `
				<div id="formSuccessModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; animation: fadeIn 0.3s;">
					<div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; text-align: center; animation: slideUp 0.5s;">
						<div style="width: 80px; height: 80px; background: #4CAF50; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
							<i class="fas fa-check" style="color: white; font-size: 40px;"></i>
						</div>
						<h3 style="color: #333; margin-bottom: 15px; font-size: 24px;">Success!</h3>
						<p style="color: #666; margin-bottom: 25px; font-size: 16px; line-height: 1.6;">
							Your message has been sent successfully. We will get back to you soon!
						</p>
						<button onclick="closeFormModal()" style="background: #4CAF50; color: white; border: none; padding: 12px 40px; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background 0.3s;">
							Close
						</button>
					</div>
				</div>
				<style>
					@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
					@keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
				</style>
			`;
			$('body').append(successHtml);
			
			if (window.history.replaceState) {
				const cleanUrl = window.location.pathname;
				window.history.replaceState({}, document.title, cleanUrl);
			}
		}
		else if (message === 'Failed') {
			const errorType = urlParams.get('error');
			let errorMessage = 'There was an error sending your message. Please try again.';
			
			if (errorType === 'missing_fields') {
				errorMessage = 'Please fill in all required fields.';
			} else if (errorType === 'smtp') {
				errorMessage = 'Email service is temporarily unavailable. Please try again later or contact us at ' + '<?php echo CONTACT_EMAIL; ?>';
			}
			
			const errorHtml = `
				<div id="formErrorModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999; animation: fadeIn 0.3s;">
					<div style="background: white; padding: 40px; border-radius: 10px; max-width: 500px; text-align: center; animation: slideUp 0.5s;">
						<div style="width: 80px; height: 80px; background: #f44336; border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
							<i class="fas fa-exclamation-triangle" style="color: white; font-size: 40px;"></i>
						</div>
						<h3 style="color: #333; margin-bottom: 15px; font-size: 24px;">Oops!</h3>
						<p style="color: #666; margin-bottom: 25px; font-size: 16px; line-height: 1.6;">
							${errorMessage}
						</p>
						<button onclick="closeFormModal()" style="background: #f44336; color: white; border: none; padding: 12px 40px; border-radius: 5px; font-size: 16px; cursor: pointer; transition: background 0.3s;">
							Close
						</button>
					</div>
				</div>
				<style>
					@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
					@keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
				</style>
			`;
			$('body').append(errorHtml);
			
			if (window.history.replaceState) {
				const cleanUrl = window.location.pathname;
				window.history.replaceState({}, document.title, cleanUrl);
			}
		}
	});
	
	// Close modal when clicking outside
	$(document).on('click', '#formSuccessModal, #formErrorModal', function(e) {
		if (e.target.id === 'formSuccessModal' || e.target.id === 'formErrorModal') {
			closeFormModal();
		}
	});
	
	// Close modal with Escape key
	$(document).on('keydown', function(e) {
		if (e.key === 'Escape') {
			closeFormModal();
		}
	});
}

// Initialize on page load
initFormModals();

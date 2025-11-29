# Refactoring Implementation Checklist

## Phase 1: Setup ✅ COMPLETED
- [x] Create `includes/config.php` with centralized configuration
- [x] Create `includes/header.php` with reusable header component
- [x] Create `includes/footer.php` with reusable footer component
- [x] Create `assets/js/custom-functions.js` with extracted JS functions
- [x] Create `REFACTORING-GUIDE.md` with documentation

## Phase 2: File Conversion (READY TO START)
- [ ] Backup current working site to `refactor-backup` branch
- [ ] Rename `index.html` to `index.php`
- [ ] Rename `owners.html` to `owners.php`
- [ ] Rename `initiatives.html` to `initiatives.php`
- [ ] Update `.htaccess` to handle .php extensions (if needed)

## Phase 3: Update index.php
- [ ] Remove `<head>` section (lines 1-19), replace with header include
- [ ] Remove header HTML (lines 20-100), already in header include
- [ ] Remove footer HTML (lines 790-870), replace with footer include
- [ ] Remove inline modal JavaScript (lines 900-990), use custom-functions.js
- [ ] Add `<?php $current_page = 'home'; include 'includes/header.php'; ?>` at top
- [ ] Add `<?php include 'includes/footer.php'; ?>` at bottom
- [ ] Add `<script src="assets/js/custom-functions.js"></script>` before footer

## Phase 4: Update owners.php
- [ ] Remove `<head>` section, replace with header include
- [ ] Remove header HTML, already in header include
- [ ] Remove footer HTML, replace with footer include
- [ ] Add `<?php $current_page = 'owners'; include 'includes/header.php'; ?>` at top
- [ ] Add `<?php include 'includes/footer.php'; ?>` at bottom

## Phase 5: Update initiatives.php
- [ ] Remove `<head>` section, replace with header include
- [ ] Remove header HTML, already in header include
- [ ] Remove footer HTML, replace with footer include
- [ ] Add `<?php $current_page = 'initiatives'; include 'includes/header.php'; ?>` at top
- [ ] Add `<?php include 'includes/footer.php'; ?>` at bottom

## Phase 6: Update contact.php
- [ ] Add `require_once 'includes/config.php';` at top
- [ ] Replace hardcoded email with `RECIPIENT_EMAIL` constant
- [ ] Test form submission still works

## Phase 7: Testing
- [ ] Test index.php loads correctly
- [ ] Test owners.php loads correctly
- [ ] Test initiatives.php loads correctly
- [ ] Test navigation between pages works
- [ ] Test contact form submission
- [ ] Test modal popups appear correctly
- [ ] Test mobile menu functionality
- [ ] Test all social media links open correctly
- [ ] Test all internal links work
- [ ] Verify no broken images
- [ ] Check browser console for JavaScript errors
- [ ] Test on mobile devices

## Phase 8: Automated Testing
- [ ] Run `npm test` to verify all Playwright tests pass
- [ ] Update test files if paths changed
- [ ] Check for any broken links in tests
- [ ] Verify accessibility tests still pass

## Phase 9: Security Enhancements (Optional)
- [ ] Add CSRF token to contact form
- [ ] Implement rate limiting for form submissions
- [ ] Add security headers to PHP files
- [ ] Sanitize all user inputs (already done mostly)

## Phase 10: Performance Optimization (Optional)
- [ ] Enable Gzip compression in .htaccess
- [ ] Add browser caching rules
- [ ] Minify CSS files
- [ ] Minify JavaScript files
- [ ] Optimize images (compress without quality loss)
- [ ] Implement lazy loading for images

## Phase 11: SEO Enhancement (Optional)
- [ ] Create `includes/seo-meta.php` component
- [ ] Add unique page titles for each page
- [ ] Add unique meta descriptions for each page
- [ ] Add Open Graph tags for social sharing
- [ ] Add Twitter Card tags
- [ ] Submit updated sitemap to Google

## Phase 12: Deployment
- [ ] Commit all changes to development branch
- [ ] Test on development environment
- [ ] Review all changes with `git diff`
- [ ] Merge to main branch
- [ ] Deploy to production server
- [ ] Monitor for any issues post-deployment
- [ ] Check Google Analytics for traffic patterns

## Phase 13: Documentation Update
- [ ] Update README.md with new structure
- [ ] Document new file organization
- [ ] Add maintenance guide for team members
- [ ] Create quick reference for common tasks

## Quick Command Reference

### Backup Before Starting
```bash
git checkout -b refactor-backup
git add .
git commit -m "Backup before refactoring"
git checkout main
```

### Rename Files
```bash
git mv index.html index.php
git mv owners.html owners.php
git mv initiatives.html initiatives.php
```

### Test Changes
```bash
npm test
```

### Commit Changes
```bash
git add .
git commit -m "Refactor: Implement reusable components and remove duplicate code"
git push origin main
```

## Notes
- Keep backup branch until production is verified working
- Test each page individually after conversion
- Check all forms, links, and interactive elements
- Monitor error logs on production server after deployment

## Estimated Time
- Phase 1: ✅ Completed (1 hour)
- Phase 2-6: 2-3 hours (file conversion and updates)
- Phase 7-8: 1-2 hours (testing)
- Phase 9-11: 3-4 hours (optional enhancements)
- Phase 12-13: 1 hour (deployment and documentation)

**Total: 8-11 hours for complete refactoring**

## Success Criteria
- [x] No duplicate code in header/footer
- [x] Single source of truth for configuration
- [ ] All pages load correctly with includes
- [ ] Contact form works as before
- [ ] All tests pass
- [ ] No console errors
- [ ] Site performs as well or better than before
- [ ] Easy to maintain and update

---
**Status:** Phase 1 Complete - Ready for Phase 2
**Last Updated:** <?php echo date('Y-m-d H:i:s'); ?>

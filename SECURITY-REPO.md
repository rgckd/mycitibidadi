# Repository Security Guide

## Sensitive Files Protected

This repository contains sensitive files that are excluded from Git to protect credentials and passwords.

### Files Ignored by Git

The following files contain sensitive information and are NOT tracked in Git:

1. **contact-phpmailer.php** - Contains SMTP password for email delivery
2. **updates/phpmailerw/get_oauth_token.php** - Contains OAuth client ID and secret
3. **updates/assets/phpmailer/mail.php** - May contain email credentials

### Template Files Available

Template versions are provided with placeholder values:

- `contact-phpmailer.php.template` - Template for SMTP email configuration
- `updates/phpmailerw/get_oauth_token.php.template` - Template for OAuth setup

### How to Set Up on Server

1. **Copy template files** to their actual names (without .template)
2. **Replace placeholder credentials** with your actual values
3. **Never commit** the actual files with real credentials

### Removing Sensitive Files from Git History

If sensitive files were previously committed, remove them from Git history:

```bash
# Remove file from Git but keep it locally
git rm --cached updates/phpmailerw/get_oauth_token.php
git rm --cached updates/assets/phpmailer/mail.php

# Commit the removal
git commit -m "Remove sensitive files from Git tracking"

# Push to repository
git push origin main
```

### For Public Repositories

**IMPORTANT**: If your repository was public when credentials were committed:

1. **Immediately revoke and regenerate** all exposed credentials:
   - Gmail App Passwords
   - OAuth Client IDs and Secrets
   - API Keys
   - Any other passwords

2. **Then** remove files from Git history using the commands above

3. **Update .gitignore** to prevent future accidents (already done)

### Current .gitignore Protection

Your `.gitignore` file now protects:

```
# Email configuration (contains passwords)
contact-phpmailer.php

# OAuth and sensitive configuration files
updates/phpmailerw/get_oauth_token.php
updates/assets/phpmailer/mail.php

# Any file ending with .secret or .private
*.secret
*.private
*-secret.php
*-private.php

# Backup files that might contain credentials
*.bak
*.backup
*~
```

### Best Practices

1. ✅ Always use `.gitignore` for files with credentials
2. ✅ Create `.template` versions with placeholders
3. ✅ Document required credentials in README files
4. ✅ Use environment variables when possible
5. ✅ Never commit passwords, API keys, or tokens
6. ✅ Regularly rotate credentials
7. ✅ Use different credentials for development vs production

### Files Safe to Commit

These files contain NO sensitive information:

- `includes/config.php` - Only public contact info and URLs
- `includes/security.php` - Security functions (no credentials)
- `get-csrf-token.php` - Token generation (no credentials)
- All HTML, CSS, JavaScript files
- Documentation files

### Emergency Response

If you accidentally commit credentials:

1. **Immediately** change all exposed passwords/keys
2. Remove the file from Git tracking (see commands above)
3. Consider using `git filter-branch` or `BFG Repo-Cleaner` to remove from entire history
4. Force push to overwrite remote history (use with caution)

### Questions?

If you're unsure whether a file contains sensitive information:
- If it has passwords, API keys, tokens, or secrets → Add to .gitignore
- If it's public contact info or configuration → Safe to commit

---

**Repository Status**: Protected ✅
**Last Updated**: November 29, 2025

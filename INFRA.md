# Minimal AWS Infrastructure Setup for Static Frontend Applications

Here's a concise guide to setting up the minimal AWS infrastructure needed for deploying any client-side rendered frontend application (Angular, React, Vue, etc.):

## 1. Create S3 Buckets for Hosting

1. **Sign in to AWS Console** and navigate to S3
2. **Create a bucket for each environment**:
   - Name: `[prefix]-[environment]-[app-name]` (e.g., `mycompany-dev-webapp`)
   - Region: Choose your preferred region
   - Block all public access: Keep enabled (we'll use CloudFront for access)
   - Default encryption: Enable with Amazon S3 managed keys
   - Add tag: `Project: [app-name]` for easier resource tracking

## 2. Set Up CloudFront Distributions

1. **Navigate to CloudFront** in the AWS Console
2. **Create a distribution for each environment**:
   - Origin domain: Select your S3 bucket
   - Origin access: Choose "Origin access control settings (recommended)"
   - Create a new OAC: Use default settings
   - Origin access control: Create and use the recommended settings
   - Viewer protocol policy: "Redirect HTTP to HTTPS"
   - Cache policy: Use "CachingOptimized" (or create a custom one if needed)
   - Origin request policy: "CORS-S3Origin"
   - Response headers policy: Create new with security headers enabled
   - Default root object: `index.html` (important for SPA routing)
   - Add tag: `Project: [app-name]`

3. **Update S3 bucket policy**:
   - After creating the distribution, CloudFront will prompt you to copy a policy
   - Go to your S3 bucket → Permissions → Bucket policy
   - Paste the generated policy and save

4. **Configure error responses for SPA routing**:
   - In your CloudFront distribution, go to "Error pages"
   - Add custom error response for HTTP error code 403:
     - Response page path: `/index.html`
     - HTTP response code: 200
   - Add the same for error code 404

## 3. Set Up IAM for GitHub Actions

1. **Create OIDC Provider**:
   - Go to IAM → Identity providers → Add provider
   - Provider type: "OpenID Connect"
   - Provider URL: `https://token.actions.githubusercontent.com`
   - Audience: `sts.amazonaws.com`
   - Add provider

2. **Create IAM Policy**:
   - Go to IAM → Policies → Create policy
   - Switch to JSON editor and paste:
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": [
           "s3:PutObject",
           "s3:GetObject",
           "s3:ListBucket",
           "s3:DeleteObject"
         ],
         "Resource": [
           "arn:aws:s3:::[prefix]-dev-[app-name]",
           "arn:aws:s3:::[prefix]-dev-[app-name]/*",
           "arn:aws:s3:::[prefix]-test-[app-name]",
           "arn:aws:s3:::[prefix]-test-[app-name]/*",
           "arn:aws:s3:::[prefix]-prod-[app-name]",
           "arn:aws:s3:::[prefix]-prod-[app-name]/*"
         ]
       },
       {
         "Effect": "Allow",
         "Action": [
           "cloudfront:CreateInvalidation"
         ],
         "Resource": "*"
       }
     ]
   }
   ```
   - Name: `[app-name]-deploy-policy`

3. **Create IAM Role**:
   - Go to IAM → Roles → Create role
   - Trusted entity type: "Web identity"
   - Identity provider: Select the GitHub OIDC provider
   - Audience: `sts.amazonaws.com`
   - GitHub organization/repository: `your-username/your-repo`
   - Add condition (optional): `token.actions.githubusercontent.com:sub`: `repo:your-username/your-repo:environment:*`
   - Attach the policy you created
   - Name: `[app-name]-github-actions-role`
   - Note the Role ARN after creation

## 4. Configure GitHub Repository

1. **Add GitHub Secrets**:
   - Go to your repository → Settings → Secrets and variables → Actions
   - Add repository secrets:
     - `AWS_REGION`: Your AWS region (e.g., `us-east-1`)
     - `AWS_IAM_ROLE`: The ARN of the IAM role you created

2. **Set Up Environments**:
   - Go to Settings → Environments
   - Create environments for each deployment target (dev, test, prod)
   - For each environment, add the secret:
     - `CLOUDFRONT_DISTRIBUTION_ID`: The ID of the corresponding CloudFront distribution

## 5. Verify Setup

1. **Test S3 Access**:
   - Upload a test file to your S3 bucket
   - Access it through the CloudFront URL

2. **Test CloudFront Configuration**:
   - Access your CloudFront domain (e.g., `https://d1234abcdef.cloudfront.net`)
   - Verify that your default root object (index.html) loads
   - Test SPA routing by navigating to a non-existent path (should load your app)

## Notes

1. **Custom Domains**: If you need a custom domain, you'll need to:
   - Register a domain in Route 53 or configure your existing domain
   - Request an SSL certificate in ACM
   - Configure CloudFront to use your custom domain and certificate

2. **Cost Optimization**:
   - S3 costs are minimal for small applications
   - CloudFront costs depend on traffic and edge locations used
   - Consider using the "Price Class 100" for CloudFront to reduce costs

3. **Security Best Practices**:
   - Never make your S3 bucket publicly accessible
   - Use the principle of least privilege for IAM roles
   - Regularly review and rotate credentials if not using OIDC

This setup provides a secure, scalable, and cost-effective infrastructure for hosting any static frontend application on AWS.

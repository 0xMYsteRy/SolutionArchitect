
import { SAADomain } from './types';

export const AWS_SERVICES = [
  'EC2', 'S3', 'VPC', 'IAM', 'RDS', 'Lambda', 'DynamoDB', 'ALB', 
  'Auto Scaling', 'CloudFront', 'Route 53', 'CloudWatch', 'EBS', 
  'CloudTrail', 'SNS', 'SQS', 'Step Functions', 'Secrets Manager'
];

export const RSS_SOURCES = [
  { id: 'whats-new', name: "What's New", url: 'https://aws.amazon.com/about-aws/whats-new/recent/feed/' },
  { id: 'aws-blog', name: 'AWS News Blog', url: 'https://aws.amazon.com/blogs/aws/feed/' },
  { id: 'arch-blog', name: 'Architecture Blog', url: 'https://aws.amazon.com/blogs/architecture/feed/' },
  { id: 'security-blog', name: 'Security Blog', url: 'https://aws.amazon.com/blogs/security/feed/' },
];

export const DOMAIN_COLORS: Record<SAADomain, string> = {
  [SAADomain.SECURE]: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200',
  [SAADomain.RESILIENT]: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200',
  [SAADomain.HIGH_PERFORMING]: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300 border-purple-200',
  [SAADomain.COST_OPTIMIZED]: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200',
  [SAADomain.OPERATIONS]: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 border-amber-200',
};


import { Article, SAADomain, RelevanceLevel } from '../types';

// In a real app, you would use a proxy like cors-anywhere or a Lambda function to fetch and parse XML
export const fetchMockArticles = async (): Promise<Article[]> => {
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 800));

  return [
    {
      id: '1',
      title: 'AWS Secrets Manager now supports managed rotation for Amazon Redshift Serverless',
      link: 'https://aws.amazon.com/about-aws/whats-new/2024/05/aws-secrets-manager-managed-rotation-amazon-redshift-serverless/',
      summary: 'You can now configure AWS Secrets Manager to automatically rotate secrets for your Amazon Redshift Serverless workgroups. This helps you follow security best practices by regularly updating credentials.',
      pubDate: '2024-05-20',
      source: "What's New",
      domains: [SAADomain.SECURE, SAADomain.OPERATIONS],
      services: ['Secrets Manager', 'Redshift'],
      relevance: RelevanceLevel.HIGH,
      examNote: 'Critical for the "Secure Architectures" domain. Know how Secrets Manager handles rotation for serverless resources to minimize credential exposure.',
      isBookmarked: false,
    },
    {
      id: '2',
      title: 'Amazon S3 Express One Zone storage class now generally available',
      link: 'https://aws.amazon.com/blogs/aws/amazon-s3-express-one-zone-high-performance-storage/',
      summary: 'Amazon S3 Express One Zone is a high-performance, single-zone S3 storage class that delivers consistent single-digit millisecond data access for your most latency-sensitive applications.',
      pubDate: '2024-05-18',
      source: 'AWS News Blog',
      domains: [SAADomain.HIGH_PERFORMING, SAADomain.COST_OPTIMIZED],
      services: ['S3'],
      relevance: RelevanceLevel.HIGH,
      examNote: 'Important for high-performance storage questions. Compare this class with S3 Standard and S3 One Zone-IA in terms of durability, availability, and performance.',
      isBookmarked: true,
    },
    {
      id: '3',
      title: 'Improved EBS Volume performance monitoring with CloudWatch',
      link: 'https://aws.amazon.com/blogs/compute/ebs-cloudwatch-metrics/',
      summary: 'New granular metrics for EBS volumes allow for better performance tuning and cost management in production environments.',
      pubDate: '2024-05-15',
      source: 'Architecture Blog',
      domains: [SAADomain.OPERATIONS, SAADomain.HIGH_PERFORMING],
      services: ['EBS', 'CloudWatch'],
      relevance: RelevanceLevel.MEDIUM,
      examNote: 'Relevant for "Deployment & Operations". Understanding monitoring tools (CloudWatch) for storage performance is a common exam topic.',
      isBookmarked: false,
    },
    {
      id: '4',
      title: 'Building Multi-Region Resilient Architectures with Global Accelerator',
      link: 'https://aws.amazon.com/blogs/networking-and-content-delivery/multi-region-resiliency-global-accelerator/',
      summary: 'Learn how to use AWS Global Accelerator to redirect traffic between AWS Regions to improve availability and reduce latency for global users.',
      pubDate: '2024-05-10',
      source: 'Architecture Blog',
      domains: [SAADomain.RESILIENT, SAADomain.HIGH_PERFORMING],
      services: ['Global Accelerator', 'Route 53'],
      relevance: RelevanceLevel.HIGH,
      examNote: 'Crucial for "Resilient Architectures". Global Accelerator is often a primary answer choice for low-latency multi-region failover scenarios.',
      isBookmarked: false,
    },
    {
      id: '5',
      title: 'Cost Optimization for DynamoDB using On-Demand Capacity',
      link: 'https://aws.amazon.com/blogs/database/dynamodb-cost-optimization/',
      summary: 'Reviewing when to use On-Demand vs Provisioned capacity for DynamoDB to save costs on unpredictable workloads.',
      pubDate: '2024-05-05',
      source: 'AWS News Blog',
      domains: [SAADomain.COST_OPTIMIZED],
      services: ['DynamoDB'],
      relevance: RelevanceLevel.HIGH,
      examNote: 'Frequently tested in "Cost-Optimized Architectures". Know the threshold where On-Demand becomes more expensive than Provisioned Capacity.',
      isBookmarked: false,
    },
    {
      id: '6',
      title: 'Implementing IAM Policy Boundaries for Delegated Administration',
      link: 'https://aws.amazon.com/blogs/security/iam-policy-boundaries-delegated-admin/',
      summary: 'A deep dive into using permissions boundaries to limit the maximum permissions that can be granted by an IAM user or role.',
      pubDate: '2024-05-01',
      source: 'Security Blog',
      domains: [SAADomain.SECURE],
      services: ['IAM'],
      relevance: RelevanceLevel.MEDIUM,
      examNote: 'Advanced security concept. Useful for questions about preventing privilege escalation in large organizations.',
      isBookmarked: false,
    }
  ];
};

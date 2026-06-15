/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MatrimonyUser {
  uid: string;
  name: string;
  email: string;
  phone?: string;
  gender?: 'male' | 'female';
  religion?: string;
  caste?: string;
  age?: number;
  profilePhoto?: string;
  status: 'active' | 'blocked';
  isVerified: boolean;
  membership: 'free' | 'premium';
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  uid: string;
  email: string;
  name: string;
  role: 'superadmin' | 'moderator';
  createdAt: string;
}

export interface ChatSession {
  chatId: string;
  participantIds: string[];
  lastMessage?: string;
  lastMessageAt?: string;
}

export interface ChatMessage {
  messageId: string;
  chatId: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
}

export interface PremiumSubscription {
  subscriptionId: string;
  userId: string;
  planName: string;
  amount: number;
  status: 'active' | 'expired';
  startDate: string;
  endDate: string;
  paymentMethod?: string;
}

export interface MatrimonyReport {
  reportId: string;
  reporterId: string;
  reportedUserId: string;
  type: 'fake_profile' | 'abuse' | 'spam';
  details: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
}

export interface SystemNotification {
  notificationId: string;
  title: string;
  body: string;
  target: 'all' | 'user';
  targetUserId?: string;
  createdAt: string;
}

export interface CMSBanner {
  id: string;
  imageUrl: string;
  linkUrl?: string;
  title: string;
  isActive: boolean;
  createdAt: string;
}

export interface CMSAnnouncement {
  id: string;
  title: string;
  content: string;
  isActive: boolean;
  createdAt: string;
}

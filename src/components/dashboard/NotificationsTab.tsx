
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Target, TrendingDown, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

// Define notification types
type NotificationType = 'market' | 'goal' | 'behavior' | 'staking';
type NotificationPriority = 'high' | 'medium' | 'low';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: Date;
  read: boolean;
  priority: NotificationPriority;
  action?: {
    text: string;
    onClick: () => void;
  };
}

const NotificationsTab = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'market',
      title: 'BTC Price Drop',
      message: 'BTC dropped 10%! Want to move some funds to USDT for safety?',
      date: new Date(),
      read: false,
      priority: 'high',
      action: {
        text: 'Convert to USDT',
        onClick: () => {
          // Handle action
        }
      }
    },
    {
      id: '2',
      type: 'goal',
      title: 'Tokyo Trip Goal',
      message: '1 month left to your \'Tokyo Trip\' goal. You\'re 200€ short: add 100€ in USDT now!',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
      priority: 'medium',
      action: {
        text: 'Add funds',
        onClick: () => {
          // Handle action
        }
      }
    },
    {
      id: '3',
      type: 'behavior',
      title: 'Spending Alert',
      message: 'You spent 50€ on NFTs today. Remember your \'Emergency Fund\' goal: consider putting 50€ in USDT with 5% annual staking!',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true,
      priority: 'low',
      action: {
        text: 'Stake USDT',
        onClick: () => {
          // Handle action
        }
      }
    },
    {
      id: '4',
      type: 'staking',
      title: 'Staking Interest',
      message: 'Your 1000€ in USDT on Crypto.com generated 4€ in interest this month. Keep it up!',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72),
      read: true,
      priority: 'medium'
    }
  ]);

  const [sortBy, setSortBy] = useState<'date' | 'priority'>('date');
  const [filterType, setFilterType] = useState<NotificationType | 'all'>('all');

  // Sort and filter notifications
  const sortedNotifications = [...notifications].sort((a, b) => {
    if (sortBy === 'date') {
      return b.date.getTime() - a.date.getTime();
    } else {
      const priorityWeight = { high: 3, medium: 2, low: 1 };
      return priorityWeight[b.priority] - priorityWeight[a.priority];
    }
  }).filter(notification => filterType === 'all' || notification.type === filterType);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  // Get icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'market':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      case 'goal':
        return <Target className="h-5 w-5 text-blue-500" />;
      case 'behavior':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'staking':
        return <CreditCard className="h-5 w-5 text-green-500" />;
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </h2>
        <div className="flex gap-2">
          <div>
            <label htmlFor="sort" className="mr-2 text-sm text-muted-foreground">Sort by:</label>
            <select 
              id="sort"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
              className="p-2 border rounded-md"
            >
              <option value="date">Date</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div>
            <label htmlFor="filter" className="mr-2 text-sm text-muted-foreground">Filter:</label>
            <select 
              id="filter"
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value as NotificationType | 'all')}
              className="p-2 border rounded-md"
            >
              <option value="all">All</option>
              <option value="market">Market</option>
              <option value="goal">Goals</option>
              <option value="behavior">Behavior</option>
              <option value="staking">Staking</option>
            </select>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {sortedNotifications.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center text-muted-foreground">
              No notifications to display
            </CardContent>
          </Card>
        ) : (
          sortedNotifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`transition-all hover:shadow-md ${!notification.read ? 'border-l-4 border-l-blue-500' : ''}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    {getNotificationIcon(notification.type)}
                    <CardTitle className="text-lg">{notification.title}</CardTitle>
                    {!notification.read && <span className="inline-block w-2 h-2 bg-blue-500 rounded-full"></span>}
                  </div>
                  <CardDescription>
                    {format(notification.date, 'MMM dd, yyyy')}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4">{notification.message}</p>
                <div className="flex justify-between items-center">
                  <Badge variant={
                    notification.priority === 'high' ? 'destructive' :
                    notification.priority === 'medium' ? 'default' : 'outline'
                  }>
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} priority
                  </Badge>
                  <div className="space-x-2">
                    {!notification.read && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        Mark as read
                      </Button>
                    )}
                    {notification.action && (
                      <Button 
                        size="sm" 
                        onClick={notification.action.onClick}
                      >
                        {notification.action.text}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationsTab;

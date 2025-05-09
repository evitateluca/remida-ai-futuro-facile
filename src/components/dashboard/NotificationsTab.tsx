import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, AlertTriangle, Target, TrendingDown, CreditCard } from 'lucide-react';
import { format } from 'date-fns';

// Define notification types
type NotificationType = 'market' | 'goal' | 'behavior' | 'staking';
type NotificationPriority = 'alta' | 'media' | 'bassa';

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

// Event emitter for notifications
const notificationEvents = {
  listeners: new Map<string, Function[]>(),
  
  subscribe: (event: string, callback: Function) => {
    if (!notificationEvents.listeners.has(event)) {
      notificationEvents.listeners.set(event, []);
    }
    notificationEvents.listeners.get(event)!.push(callback);
    return () => {
      const eventListeners = notificationEvents.listeners.get(event);
      if (eventListeners) {
        const index = eventListeners.indexOf(callback);
        if (index > -1) {
          eventListeners.splice(index, 1);
        }
      }
    };
  },
  
  emit: (event: string, data?: any) => {
    if (notificationEvents.listeners.has(event)) {
      notificationEvents.listeners.get(event)!.forEach(callback => callback(data));
    }
  }
};

// Export event emitter
export { notificationEvents };

const NotificationsTab = () => {
  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'market',
      title: 'Il prezzo di BTC è calato',
      message: 'Il prezzo di BTC è calato del 10%! Vuoi spostare alcuni fondi in USDT per sicurezza?',
      date: new Date(),
      read: false,
      priority: 'alta',
      action: {
        text: 'Converti in USDT',
        onClick: () => {
          // Handle action
        }
      }
    },
    {
      id: '2',
      type: 'goal',
      title: 'Obiettivo viaggio a Tokyo',
      message: '1 mese rimasto per il tuo obiettivo \'Viaggio a Tokyo\'. Ti mancano 200€: aggiungi 100€ in USDT!',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24),
      read: false,
      priority: 'media',
      action: {
        text: 'Aggiungi fondi',
        onClick: () => {
          // Handle action
        }
      }
    },
    {
      id: '3',
      type: 'behavior',
      title: 'Avviso di spesa',
      message: 'Hai speso 50€ in NFT oggi. Ricorda il tuo obiettivo \'Fondo di Emergenza\': valuta di investire 50€ in USDT con uno staking annuale del 5%!',
      date: new Date(Date.now() - 1000 * 60 * 60 * 48),
      read: true,
      priority: 'bassa',
      action: {
        text: 'Metti USDT in stake',
        onClick: () => {
          // Handle action
        }
      }
    },
    {
      id: '4',
      type: 'staking',
      title: 'Interesse di Staking',
      message: 'I tuoi 1000€ in USDT su Crypto.com hanno generato 4€ di interessi questo mese. Continua così!',
      date: new Date(Date.now() - 1000 * 60 * 60 * 72),
      read: true,
      priority: 'media'
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
    const updatedNotifications = notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    );
    setNotifications(updatedNotifications);
    
    // Emit event for updating the unread count
    const unreadCount = updatedNotifications.filter(n => !n.read).length;
    notificationEvents.emit('unread-count-changed', unreadCount);
  };

  // Mark all as read
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notif => ({ ...notif, read: true }));
    setNotifications(updatedNotifications);
    
    // Emit event for updating the unread count to zero
    notificationEvents.emit('unread-count-changed', 0);
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

  // When component mounts, emit the initial unread count
  useEffect(() => {
    notificationEvents.emit('unread-count-changed', unreadCount);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifiche
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} non lette
            </Badge>
          )}
        </h2>
        <div className="flex gap-4">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Segna tutto come letto
            </Button>
          )}
          <div className="flex gap-2">
            <div>
              <label htmlFor="sort" className="mr-2 text-sm text-muted-foreground">Ordina per:</label>
              <select 
                id="sort"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as 'date' | 'priority')}
                className="p-2 border rounded-md"
              >
                <option value="date">Data</option>
                <option value="priority">Priorità</option>
              </select>
            </div>
            <div>
              <label htmlFor="filter" className="mr-2 text-sm text-muted-foreground">Filtra:</label>
              <select 
                id="filter"
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value as NotificationType | 'all')}
                className="p-2 border rounded-md"
              >
                <option value="all">Tutto</option>
                <option value="market">Mercato</option>
                <option value="goal">Obiettivi</option>
                <option value="behavior">Comportamento</option>
                <option value="staking">Staking</option>
              </select>
            </div>
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
                    notification.priority === 'alta' ? 'destructive' :
                    notification.priority === 'media' ? 'default' : 'outline'
                  }>
                    {notification.priority.charAt(0).toUpperCase() + notification.priority.slice(1)} priorità
                  </Badge>
                  <div className="space-x-2">
                    {!notification.read && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => markAsRead(notification.id)}
                      >
                        Segna come letto
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

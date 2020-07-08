import { Alert } from 'react-native';
import { User } from '../interfaces/User';
import PushNotification from 'react-native-push-notification';
import io from 'socket.io-client';

class NotificationService {
  private socket: any;
  private user: User;
  private WEBSOCKET_URL = 'http://192.168.0.33:8080';

  constructor(user: User) {
    this.user = user;
    this.configurePushNotification();
    this.connect();
  }

  connect = () => {
    this.socket = io.connect(this.WEBSOCKET_URL);
    this.socket.emit('connect', { userId: this.user._id })
  };

  registerActions = () => {
    this.socket.on('next', (next: User) => {
      if (this.user.email === next.email) {
        const title = 'É sua vez!';
        const message = 'Diraja-se ao posto de atendimento.';
        this.notify(title, message);
      }
    });
  };

  configurePushNotification = () => {
    PushNotification.configure({
      onRegister: function (token: any) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: false,
    });
  };

  notify = (title: string, message: string) => {
    PushNotification.localNotification({
      ongoing: false,
      visibility: 'public',
      importance: 'high',
      title,
      message,
      actions: '["Ok"]',
    });
  };
}

export default NotificationService;

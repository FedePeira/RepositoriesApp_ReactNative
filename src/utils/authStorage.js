import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
 constructor(namespace = 'auth') {
    this.namespace = namespace;
    this.subscribers = [];
 }

 subscribe(callback) {
    this.subscribers.push(callback);
    return () => {
      this.subscribers = this.subscribers.filter(subscriber => subscriber !== callback);
    };
  }

  notifySubscribers() {
    this.subscribers.forEach(callback => callback());
  }

  async isAuthenticated() {
    const token = await this.getAccessToken();
    return token !== null;
  }

  async getAccessToken() {
    try {
      const value = await AsyncStorage.getItem(`${this.namespace}:accessToken`);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.error("Error al obtener el token de acceso:", error);
    }
    return null;
  }

  async setAccessToken(accessToken) {
    try {
      await AsyncStorage.setItem(`${this.namespace}:accessToken`, accessToken);
      console.log("Token de acceso almacenado exitosamente.");
    } catch (error) {
      console.error("Error al almacenar el token de acceso:", error);
    }
  }

  async removeAccessToken() {
    try {
      await AsyncStorage.removeItem(`${this.namespace}:accessToken`);
      console.log("Token de acceso eliminado exitosamente.");
    } catch (error) {
      console.error("Error al eliminar el token de acceso:", error);
    }
  }
}

export default AuthStorage;
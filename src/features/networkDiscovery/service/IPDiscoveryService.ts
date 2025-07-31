import axios from 'axios';

export class IPDiscoveryService {
  private readonly PORT = 80;
  private readonly PATH = '/requests/status.json';
  private readonly TIMEOUT = 300;

  async pingServer(ip: string): Promise<boolean> {
    try {
      await axios.get(`http://${ip}:${this.PORT}${this.PATH}`, {
        timeout: this.TIMEOUT,
        auth: { username: '', password: 'your_password' },
      });
      return true;
    } catch {
      return false;
    }
  }

  async scanNetwork(): Promise<string | null> {
    const prefix = '192.168.0'; // Idealmente dinâmico depois
    const maxSteps = 5;
    const stepSize = 50;

    for (let step = 0; step < maxSteps; step++) {
      const start = step * stepSize + 1;
      const end = Math.min(start + stepSize, 255);
      const batch = Array.from({ length: end - start + 1 }, (_, i) => `${prefix}.${start + i}`);

      const found = await Promise.any(
        batch.map(ip => this.pingServer(ip).then(ok => (ok ? ip : Promise.reject()))),
      ).catch(() => null);

      if (found) return found;
    }

    return null;
  }
}

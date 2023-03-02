import {Injectable} from '@angular/core'

@Injectable()
export class PersistenceService {
  public get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(''))
    } catch (e) {
      console.error('Error getting data from localStorage', e)
      return null
    }
  }

  public set(key: string, data: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error('Error setting data to localStorage', e)
    }
  }
}

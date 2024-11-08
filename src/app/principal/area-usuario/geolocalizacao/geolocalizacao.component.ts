import { Component, OnInit, Renderer2 } from '@angular/core';
import { environment } from '../../../../../src/environments/environment';

/// <reference types="@types/google.maps" />

@Component({
  selector: 'app-geolocalizacao',
  templateUrl: './geolocalizacao.component.html',
  styleUrl: './geolocalizacao.component.scss',
})
export class GeolocalizacaoComponent implements OnInit {
  map: google.maps.Map | undefined; // Tipagem adequada para o mapa

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.loadGoogleMapsScript().then(() => {
      this.initMap(); // Inicializa o mapa após carregar o script
    });
  }

  private initMap(): void {
    const mapOptions: google.maps.MapOptions = {
      center: { lat: -34, lng: 150 },
      zoom: 8,
    };
    this.map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
  }

  private loadGoogleMapsScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.getElementById('google-maps-script')) {
        resolve(); // Já está carregado
        return;
      }
      const script = this.renderer.createElement('script');
      script.id = 'google-maps-script';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places`;
      script.onload = () => resolve();
      script.onerror = () => reject();
      this.renderer.appendChild(document.body, script);
    });
  }
}

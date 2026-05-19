# asteroid.py
import pygame
import random
from settings import *

class Asteroid(pygame.sprite.Sprite):
    def __init__(self, speed):
        super().__init__()
        self.image = pygame.Surface((ASTEROID_WIDTH, ASTEROID_HEIGHT), pygame.SRCALPHA)
        # Desenha o asteroide como um círculo
        pygame.draw.circle(self.image, ASTEROID_COLOR, (ASTEROID_WIDTH // 2, ASTEROID_HEIGHT // 2), ASTEROID_WIDTH // 2)
        self.rect = self.image.get_rect()
        # Surge aleatoriamente no eixo X
        self.rect.x = random.randrange(0, WIDTH - ASTEROID_WIDTH)
        # Surge fora da tela no topo, para descer
        self.rect.y = random.randrange(-100, -40)
        self.speed_y = speed

    def update(self):
        self.rect.y += self.speed_y

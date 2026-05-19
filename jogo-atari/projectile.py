# projectile.py
import pygame
from settings import *

class Projectile(pygame.sprite.Sprite):
    def __init__(self, x, y):
        super().__init__()
        self.image = pygame.Surface((PROJECTILE_WIDTH, PROJECTILE_HEIGHT))
        self.image.fill(PROJECTILE_COLOR)
        self.rect = self.image.get_rect()
        self.rect.centerx = x
        self.rect.bottom = y

    def update(self):
        self.rect.y -= PROJECTILE_SPEED
        # Remover o tiro se sair da tela pelo topo
        if self.rect.bottom < 0:
            self.kill()

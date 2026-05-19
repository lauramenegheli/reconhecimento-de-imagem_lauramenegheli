# player.py
import pygame
from settings import *

class Player(pygame.sprite.Sprite):
    def __init__(self):
        super().__init__()
        self.image = pygame.Surface((PLAYER_WIDTH, PLAYER_HEIGHT), pygame.SRCALPHA)
        # Desenha a nave como um triângulo apontando para cima
        pontos = [(PLAYER_WIDTH // 2, 0), (0, PLAYER_HEIGHT), (PLAYER_WIDTH, PLAYER_HEIGHT)]
        pygame.draw.polygon(self.image, PLAYER_COLOR, pontos)
        self.rect = self.image.get_rect()
        self.rect.centerx = WIDTH // 2
        self.rect.bottom = HEIGHT - 20
        self.speed_x = 0

    def update(self):
        self.speed_x = 0
        keys = pygame.key.get_pressed()
        if keys[pygame.K_LEFT]:
            self.speed_x = -PLAYER_SPEED
        if keys[pygame.K_RIGHT]:
            self.speed_x = PLAYER_SPEED

        self.rect.x += self.speed_x

        # Manter a nave dentro da tela
        if self.rect.right > WIDTH:
            self.rect.right = WIDTH
        if self.rect.left < 0:
            self.rect.left = 0

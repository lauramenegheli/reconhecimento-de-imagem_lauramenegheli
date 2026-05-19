# main.py
import pygame
import sys
import random
from settings import *
from player import Player
from projectile import Projectile
from asteroid import Asteroid

# Inicializa o pygame
pygame.init()
pygame.font.init()

# Configura a tela e o relógio
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption("Defensor de Asteroides")
clock = pygame.time.Clock()
font = pygame.font.SysFont("arial", 36)

def main():
    # Grupos de sprites para facilitar atualizações e colisões
    all_sprites = pygame.sprite.Group()
    asteroids = pygame.sprite.Group()
    projectiles = pygame.sprite.Group()

    # Cria o jogador
    player = Player()
    all_sprites.add(player)

    score = 0
    frame_count = 0
    running = True
    game_over = False

    current_spawn_rate = INITIAL_SPAWN_RATE
    current_asteroid_speed = INITIAL_ASTEROID_SPEED

    # Fundo estrelado
    stars = [[random.randint(0, WIDTH), random.randint(0, HEIGHT)] for _ in range(100)]

    while running:
        # FPS do jogo
        clock.tick(FPS)
        frame_count += 1

        # 1. Checagem de eventos (inputs do usuário)
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_SPACE:
                    if game_over:
                        # Reinicia o jogo
                        game_over = False
                        score = 0
                        frame_count = 0
                        current_spawn_rate = INITIAL_SPAWN_RATE
                        current_asteroid_speed = INITIAL_ASTEROID_SPEED
                        all_sprites.empty()
                        asteroids.empty()
                        projectiles.empty()
                        player = Player()
                        all_sprites.add(player)
                    else:
                        # Atirar: cria um projétil na posição atual do topo da nave
                        proj = Projectile(player.rect.centerx, player.rect.top)
                        all_sprites.add(proj)
                        projectiles.add(proj)

        if not game_over:
            # 2. Atualiza a lógica (movimento dos sprites)
            all_sprites.update()

            # Lógica de criação de novos asteroides (spawn)
            if frame_count % current_spawn_rate == 0:
                ast = Asteroid(current_asteroid_speed)
                all_sprites.add(ast)
                asteroids.add(ast)

            # Checa colisões: Tiro acertando Asteroide
            # O último True, True significa que tanto o asteroide quanto o tiro serão deletados
            hits = pygame.sprite.groupcollide(asteroids, projectiles, True, True)
            for hit in hits:
                score += 10 # Aumenta a pontuação para cada asteroide destruído
                
                # Aumenta a dificuldade a cada 50 pontos (5 asteroides)
                if score % 50 == 0:
                    if current_spawn_rate > 15:
                        current_spawn_rate -= 5 # Ficam mais frequentes
                    if current_asteroid_speed < 15:
                        current_asteroid_speed += 1 # Ficam mais rápidos

            # Checa colisões: Asteroide acertando o Jogador
            hits_player = pygame.sprite.spritecollide(player, asteroids, False)
            if hits_player:
                game_over = True # O jogo acaba se a nave bater num asteroide

            # Checa se algum asteroide passou do fundo da tela
            for ast in asteroids:
                if ast.rect.top > HEIGHT:
                    game_over = True # O jogo acaba se um asteroide atingir o fundo

        # 3. Desenha os gráficos na tela
        screen.fill(BLACK) # Limpa a tela com fundo preto
        
        # Desenha e move as estrelas do fundo
        for star in stars:
            star[1] += 2 # Velocidade das estrelas
            if star[1] > HEIGHT:
                star[1] = 0
                star[0] = random.randint(0, WIDTH)
            pygame.draw.circle(screen, WHITE, star, 1)

        all_sprites.draw(screen) # Desenha todos os sprites

        # Desenha a pontuação no canto superior esquerdo
        score_text = font.render(f"Pontos: {score}", True, WHITE)
        screen.blit(score_text, (10, 10))

        # Mensagem de Game Over no centro da tela
        if game_over:
            game_over_text = font.render("GAME OVER", True, RED)
            screen.blit(game_over_text, (WIDTH // 2 - 100, HEIGHT // 2))
            restart_text = font.render("Pressione ESPAÇO para reiniciar", True, WHITE)
            screen.blit(restart_text, (WIDTH // 2 - 220, HEIGHT // 2 + 50))

        # 4. Atualiza o display (mostra os desenhos feitos neste frame)
        pygame.display.flip()

    pygame.quit()
    sys.exit()

if __name__ == "__main__":
    main()

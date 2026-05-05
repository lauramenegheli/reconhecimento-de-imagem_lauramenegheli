def eh_primo(n):
    """
    Verifica se um número é primo.
    
    Esta função implementa o teste de primalidade para números inteiros,
    utilizando uma otimização baseada no algoritmo de verificação de divisores
    até a raiz quadrada do número.
    
    Args:
        n (int): O número inteiro a ser verificado se é primo.
    
    Returns:
        bool: True se o número for primo, False caso contrário.
    
    Examples:
        >>> eh_primo(2)
        True
        >>> eh_primo(4)
        False
    """
    if n <= 1:
        return False
    if n <= 3:
        return True
    if n % 2 == 0 or n % 3 == 0:
        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

if __name__ == '__main__':
    numeros = [1, 2, 3, 4, 16, 17, 19, 20]
    for num in numeros:
        print(f"{num}: {eh_primo(num)}")

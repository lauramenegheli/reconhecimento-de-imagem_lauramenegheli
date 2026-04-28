def calcular_estatisticas(numeros):
    total = sum(numeros)
    media = total / len(numeros)
    maximo = max(numeros)
    minimo = min(numeros)
    return total, media, maximo, minimo

lista = [23, 7, 45, 2, 67, 12, 89, 34, 56, 11]
total, media, maximo, minimo = calcular_estatisticas(lista)
print("total:", total)
print("media:", media)
print("maior:", maximo)
print("menor:", minimo)
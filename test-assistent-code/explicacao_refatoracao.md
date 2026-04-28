# Explicação linha a linha do código `refatoracao.py`

A seguir está uma explicação detalhada de cada parte do código que calcula estatísticas básicas de uma lista.

```python
def c(l):
    t=0
    for i in range(len(l)):
        t=t+l[i]
    m=t/len(l)
    mx=l[0]
    mn=l[0]
    for i in range(len(l)):
        if l[i]>mx:
            mx=l[i]
        if l[i]<mn:
            mn=l[i]
    return t,m,mx,mn

x=[23,7,45,2,67,12,89,34,56,11]
a,b,c2,d=c(x)
print("total:",a)
print("media:",b)
print("maior:",c2)
print("menor:",d)
```

## Explicação detalhada

- `def c(l):`
  - Define uma função chamada `c` que recebe uma lista `l` como parâmetro.
  - Esta função calcula o total, média, máximo e mínimo da lista.

- `    t=0`
  - Inicializa a variável `t` (total) com 0.

- `    for i in range(len(l)):`
  - Inicia um loop que itera sobre os índices da lista `l`.

- `        t=t+l[i]`
  - Adiciona o elemento na posição `i` da lista ao total `t`.

- `    m=t/len(l)`
  - Calcula a média `m` dividindo o total pelo número de elementos na lista.

- `    mx=l[0]`
  - Inicializa `mx` (máximo) com o primeiro elemento da lista.

- `    mn=l[0]`
  - Inicializa `mn` (mínimo) com o primeiro elemento da lista.

- `    for i in range(len(l)):`
  - Outro loop para iterar sobre os índices da lista.

- `        if l[i]>mx:`
  - Verifica se o elemento atual é maior que o máximo atual.

- `            mx=l[i]`
  - Atualiza o máximo se a condição for verdadeira.

- `        if l[i]<mn:`
  - Verifica se o elemento atual é menor que o mínimo atual.

- `            mn=l[i]`
  - Atualiza o mínimo se a condição for verdadeira.

- `    return t,m,mx,mn`
  - Retorna uma tupla com total, média, máximo e mínimo.

- `x=[23,7,45,2,67,12,89,34,56,11]`
  - Define uma lista `x` com números para teste.

- `a,b,c2,d=c(x)`
  - Chama a função `c` com a lista `x` e desempacota os valores retornados.

- `print("total:",a)`
  - Imprime o total.

- `print("media:",b)`
  - Imprime a média.

- `print("maior:",c2)`
  - Imprime o maior valor.

- `print("menor:",d)`
  - Imprime o menor valor.

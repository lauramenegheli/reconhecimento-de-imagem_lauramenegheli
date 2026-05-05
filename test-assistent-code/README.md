# Test Assistant Code

Este projeto contém exemplos de código Python para fins educacionais, demonstrando conceitos como verificação de números primos, refatoração de código e cálculos estatísticos básicos. Inclui explicações detalhadas linha a linha para facilitar o aprendizado.

## Arquivos

- `num_primos.py`: Função para verificar se um número é primo, com docstring no estilo Google em português.
- `refatoracao.py`: Código refatorado para calcular estatísticas básicas (total, média, máximo e mínimo) de uma lista, utilizando funções built-in do Python.
- `explicacao_num_primo.md`: Explicação detalhada linha a linha do código em `num_primos.py`.
- `explicacao_refatoracao.md`: Explicação detalhada linha a linha do código em `refatoracao.py`.

## Como Executar

Para executar os scripts, você precisa ter o Python instalado (versão 3.x recomendada).

### Executando `num_primos.py`
```bash
python num_primos.py
```
Este script testa a função `eh_primo` com uma lista de números e imprime os resultados.

### Executando `refatoracao.py`
```bash
python refatoracao.py
```
Este script calcula e imprime as estatísticas de uma lista pré-definida.

## Requisitos

- Python 3.x

## Exemplos de Uso

### Verificação de Números Primos
```python
from num_primos import eh_primo

print(eh_primo(17))  # True
print(eh_primo(20))  # False
```

### Cálculo de Estatísticas
```python
from refatoracao import calcular_estatisticas

numeros = [1, 2, 3, 4, 5]
total, media, maximo, minimo = calcular_estatisticas(numeros)
print(f"Total: {total}, Média: {media}, Máximo: {maximo}, Mínimo: {minimo}")
```

## Contribuição

Este projeto é para fins de aprendizado. Sinta-se à vontade para sugerir melhorias ou adicionar mais exemplos.

## Licença

Este projeto é de domínio público. Use como quiser.
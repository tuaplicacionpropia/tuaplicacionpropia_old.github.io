title: Solventar los problemas del groupby
mainImage: showdown.logo.readme.png
content: 
 '''

Tras mucho buscar al final encontré la [solución][solucion] a la deficiencia del groupby.
Cómo seleccionar otras columnas que no aparecen o no deben aparecer en la cláusula groupby.

[Solución][solucion]:
```md
SELECT tTwo.* FROM (SELECT notUnique, MAX(id) AS mid FROM t GROUP BY notUnique) tOne INNER JOIN t AS tTwo ON (tTwo.id=tOne.mid);
```



Imaginemos que queremos conocer el importe total anual de todas las facturas de nuestros clientes que pueden cambiar de nombre de titular pero no de cif y solo debemos agrupar por cif.
El SQL siguiente funciona:
```md
SELECT FACTURA.cif, SUM(FACTURA.importe) as total
FROM FACTURA
WHERE to_char(FACTURA.fecha,'YYYY') = '2016' 
GROUP BY FACTURA.cif
ORDER BY FACTURA.cif
;
```

Pero el que viene a continuación, NO FUNCIONA:
```md
SELECT FACTURA.titular, FACTURA.cif, SUM(FACTURA.importe) as total
FROM FACTURA
WHERE to_char(FACTURA.fecha,'YYYY') = '2016' 
GROUP BY FACTURA.cif
ORDER BY FACTURA.cif
;
```

Teniendo en cuenta que el ID es incremental, lo que hacemos es escoger el último nombre conocido de titular para cada cliente. Es por ello por lo que empleamos la función MAX.
Si quisiéramos el primer nombre conocido, emplearíamos la función MIN.
La consulta SQL sería la siguiente:
```md
SELECT tOne.cif, tTwo.titular, tOne.total 
FROM (
   SELECT FACTURA.cif, 
   SUM(FACTURA.importe) as total
   MAX(FACTURA.id) as mid
   FROM FACTURA
   WHERE to_char(FACTURA.fecha,'YYYY') = '2016' 
   GROUP BY FACTURA.cif
   ORDER BY FACTURA.cif
) tOne
LEFT JOIN FACTURA tTwo ON tTwo.id = tOne.mid
;
```


 
[solucion]: http://stackoverflow.com/questions/25909685/mysql-join-how-to-join-only-first-match-join-limit-1

 '''

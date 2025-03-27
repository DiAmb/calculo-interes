package com.diego.calculo_interes.service

import com.diego.calculo_interes.model.InteresRequest
import com.diego.calculo_interes.model.InteresResponse
import com.diego.calculo_interes.model.AnioMonto
import com.diego.calculo_interes.model.InteresEntity
import com.diego.calculo_interes.repository.InteresRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter

@Service
class InteresService(private val interesRepository: InteresRepository) {

    fun calcularInteres(request: InteresRequest): InteresResponse {
        val valores = mutableListOf<AnioMonto>()
        var montoAcumulado = request.montoInicial

        for (anio in 1..request.anios) {
            montoAcumulado += montoAcumulado * (request.tasaInteres / 100)
            montoAcumulado = String.format("%.2f", montoAcumulado).toDouble()
            valores.add(AnioMonto(anio, montoAcumulado))
        }

        val resultadoJson = valores.joinToString(prefix = "[", postfix = "]") {
            """{"anio": ${it.anio}, "monto": %.2f}""".format(it.monto)
        }

        val fechaCalculo = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))

        val interesEntity = InteresEntity(
            montoInicial = request.montoInicial,
            tasaInteres = request.tasaInteres,
            anios = request.anios,
            resultadoJson = resultadoJson,
            fechaCalculo = fechaCalculo
        )
        interesRepository.save(interesEntity)

        return InteresResponse(valores)
    }
}
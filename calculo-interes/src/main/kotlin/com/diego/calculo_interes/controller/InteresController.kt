package com.diego.calculo_interes.controller


import com.diego.calculo_interes.model.InteresRequest
import com.diego.calculo_interes.model.InteresResponse
import com.diego.calculo_interes.service.InteresService
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/interes")
class InteresController(private val interesService: InteresService) {

    @PostMapping("/calcular")
    fun calcularInteres(@RequestBody request: InteresRequest): InteresResponse {
        return interesService.calcularInteres(request)
    }
}
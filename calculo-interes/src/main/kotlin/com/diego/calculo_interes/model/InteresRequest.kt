package com.diego.calculo_interes.model

data class InteresRequest(
    val montoInicial: Double,
    val tasaInteres: Double,
    val anios: Int
)

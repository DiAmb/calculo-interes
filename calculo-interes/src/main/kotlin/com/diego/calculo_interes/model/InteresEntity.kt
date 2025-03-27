package com.diego.calculo_interes.model


import jakarta.persistence.*

@Entity
@Table(name = "interes")
data class InteresEntity(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,

    val montoInicial: Double,
    val tasaInteres: Double,
    val anios: Int,

    @Column(columnDefinition = "TEXT")
    val resultadoJson: String,

    val fechaCalculo: String
)
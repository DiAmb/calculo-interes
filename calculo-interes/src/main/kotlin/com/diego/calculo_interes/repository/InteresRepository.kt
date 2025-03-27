package com.diego.calculo_interes.repository

import com.diego.calculo_interes.model.InteresEntity
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface InteresRepository : JpaRepository<InteresEntity, Long>

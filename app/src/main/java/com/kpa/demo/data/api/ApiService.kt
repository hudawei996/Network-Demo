package com.kpa.demo.data.api

import com.kpa.demo.data.model.Girls
import retrofit2.http.GET
import retrofit2.http.Path
import retrofit2.http.Query

/**
 *    author : kpa
 *    e-mail : billkp@yeah.net
 */

interface ApiService  {
    @GET("/api/girls")
    suspend fun getGirls(@Query("page") page: Int): Girls

    @GET("")
    suspend fun getString(): String
}
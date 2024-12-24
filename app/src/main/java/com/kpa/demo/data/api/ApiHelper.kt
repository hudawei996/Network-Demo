package com.kpa.demo.data.api

import com.kpa.demo.data.http.NetWorkHelper

/**
 *    author : kpa
 *    e-mail : billkp@yeah.net
 */
class ApiHelper(private val apiService: ApiService = NetWorkHelper.apiService) {
    suspend fun getGirls() = apiService.getGirls(1)
    suspend fun getString() = apiService.getString()
}
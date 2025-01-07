package com.kpa.demo.ui.main.view

import android.os.Bundle
import android.util.Log
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import com.kpa.demo.data.model.Girls
import com.kpa.demo.databinding.ActivityMainBinding
import com.kpa.demo.ui.base.ViewModelFactory
import com.kpa.demo.ui.main.adapter.MainAdapter
import com.kpa.demo.ui.main.viewmodel.MainViewModel
import com.kpa.demo.utils.Status

class MainActivity : AppCompatActivity() {
    private lateinit var binding: ActivityMainBinding
    private lateinit var mainViewModel: MainViewModel
    private lateinit var adapter: MainAdapter
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // 初始化绑定对象
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        setupViewModel()
        setupObserver()
    }

    private fun setupObserver() {
        mainViewModel.getGirls(2).observe(this, Observer {
            it?.let { resource ->
                when (resource.status) {
                    Status.SUCCESS -> {
                        binding.recyclerView.visibility = View.VISIBLE
                        binding.progressBar.visibility = View.GONE
                        resource.data?.let { girls -> renderList(girls) }
                    }

                    Status.ERROR -> {
                        binding.progressBar.visibility = View.VISIBLE
                        binding.recyclerView.visibility = View.GONE
                    }

                    Status.LOADING -> {
                        binding.progressBar.visibility = View.VISIBLE
                    }
                }
            }
        })

        mainViewModel.getString().observe(this, Observer { it ->
            it?.let { resource ->
                when (resource.status) {
                    Status.SUCCESS -> {
                        binding.recyclerView.visibility = View.VISIBLE
                        binding.progressBar.visibility = View.GONE
                        resource.data?.let { ittt ->
                            //String -> renderList(girls)
                            Log.d("tag",ittt)
                        }
                    }

                    Status.ERROR -> {
                        binding.progressBar.visibility = View.VISIBLE
                        binding.recyclerView.visibility = View.GONE
                    }

                    Status.LOADING -> {
                        binding.progressBar.visibility = View.VISIBLE
                    }
                }
            }
        })
    }

    private fun setupViewModel() {
        mainViewModel =
            ViewModelProvider(
                this,
                //调整为默认可以不写这个每次都要写的参数,如果需要特别指定就写下
                //多级分层是可方便替换每个类的实现,方便扩展
//                ViewModelFactory(ApiHelper(NetWorkHelper.apiService))
                ViewModelFactory()
            )[MainViewModel::class.java]
    }

    private fun renderList(girls: Girls) {
        adapter.apply {
            addData(girls.girlList)
            notifyDataSetChanged()
        }
    }

    private fun setupUI() {
        binding.recyclerView.layoutManager = LinearLayoutManager(this)
        adapter = MainAdapter(arrayListOf())
        binding.recyclerView.addItemDecoration(
            DividerItemDecoration(
                binding.recyclerView.context,
                (binding.recyclerView.layoutManager as LinearLayoutManager).orientation
            )
        )
        binding.recyclerView.adapter = adapter
    }
}
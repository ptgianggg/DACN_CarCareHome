package dacn.example.DACN.controller;

import dacn.example.DACN.entity.CategoryEntity;
import dacn.example.DACN.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.annotation.PostConstruct;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    @Autowired
    private CategoryRepository categoryRepository;

    @PostConstruct
    public void seedCategories() {
        if (categoryRepository.count() == 0) {
            String[] data = {
                "Bảo dưỡng định kỳ",
                "Chăm sóc",
                "Rửa xe & Hút bụi",
                "Sửa chữa",
                "Thuê xe"
            };
            for (String name : data) {
                CategoryEntity cat = new CategoryEntity();
                cat.setName(name);
                categoryRepository.save(cat);
            }
        }
    }

    @GetMapping
    public ResponseEntity<List<CategoryEntity>> getAllCategories() {
        return ResponseEntity.ok(categoryRepository.findAll());
    }

    // Creating initial categories if empty or just standard add
    @PostMapping
    public ResponseEntity<CategoryEntity> createCategory(@RequestBody CategoryEntity category) {
        return ResponseEntity.ok(categoryRepository.save(category));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryEntity> updateCategory(@PathVariable Long id, @RequestBody CategoryEntity details) {
        return categoryRepository.findById(id).map(cat -> {
            cat.setName(details.getName());
            return ResponseEntity.ok(categoryRepository.save(cat));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}

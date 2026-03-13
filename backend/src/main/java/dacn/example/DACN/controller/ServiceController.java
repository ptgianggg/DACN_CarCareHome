package dacn.example.DACN.controller;

import dacn.example.DACN.entity.ServiceEntity;
import dacn.example.DACN.service.ServiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceService serviceService;

    @GetMapping
    public List<ServiceEntity> getAllServices() {
        return serviceService.getAllServices();
    }

    @GetMapping("/{id}")
    public ServiceEntity getServiceById(@PathVariable Long id) {
        return serviceService.getServiceById(id).orElse(null);
    }

    @PostMapping
    public ServiceEntity createService(@RequestBody ServiceEntity service) {
        System.out.println("DEBUG: ServiceController - Creating service: " + service.getName());
        return serviceService.saveService(service);
    }

    @PutMapping("/{id}")
    public ServiceEntity updateService(@PathVariable Long id, @RequestBody ServiceEntity service) {
        service.setId(id);
        return serviceService.saveService(service);
    }

    @DeleteMapping("/{id}")
    public void deleteService(@PathVariable Long id) {
        serviceService.deleteService(id);
    }
}

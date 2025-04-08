package com.farmer.farmermanagement.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ForgotUserIdDTO {

    @NotBlank(message = "Email or Phone number is required")
    private String emailOrPhone;
}

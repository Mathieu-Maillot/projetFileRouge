﻿using System.ComponentModel.DataAnnotations;

namespace UserMicroservice.DTOs.Users
{
    public class UserLoginRequestDTO
    {
        [Required]
        public string? Email { get; set; }
        [Required]
        public string? Password { get; set; }
    }
}

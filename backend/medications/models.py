from django.db import models
from datetime import date, timedelta

class Medication(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    expiration_date = models.DateField()

    def __str__(self):
        return self.name

    def is_expiring_soon(self, days=30):
        """Check if the medication is expiring within the next `days`."""
        return date.today() + timedelta(days=days) >= self.expiration_date


from django.db import models

class Medication(models.Model):
    name = models.CharField(max_length=100)
    expiry_date = models.DateField()
    # add any other fields you need for the medication model

    def __str__(self):
        return self.name


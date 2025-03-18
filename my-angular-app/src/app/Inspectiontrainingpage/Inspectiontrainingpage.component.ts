import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SessionStorageService } from '../storage.service';
import { NavbarComponent } from '../Navbar/Navbar.component';
import { BoundingBoxComponent } from './bounding-box/bounding-box.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inspectiontrainingpage',
  templateUrl: './Inspectiontrainingpage.component.html',
  styleUrls: ['./Inspectiontrainingpage.component.css'],
  imports: [ReactiveFormsModule, CommonModule, NavbarComponent, BoundingBoxComponent],
  providers: []
})
export class InspectiontrainingpageComponent implements OnInit {
  title = 'Inspectiontrainingpage';
  webScrapingForm: FormGroup;
  inspectionData: any = null;
  inspectionName: string = '';
  model: any; 
  models: any[] = []; 

  annotations = [
    {
      category: "Lights",
      data: [
        {
          "score": 0.784191906452179,
          "bounding_box": [
            0.0,
            318.53045654296875,
            714.7138671875,
            480.0000305175781
          ],
          "class_name": "Lights"
        },
        {
          "score": 0.6209020018577576,
          "bounding_box": [
            571.2550048828125,
            285.3121032714844,
            720.0,
            332.5782470703125
          ],
          "class_name": "Lights"
        },
        {
          "score": 0.5423328876495361,
          "bounding_box": [
            626.7278442382812,
            282.482666015625,
            720.0,
            342.1352844238281
          ],
          "class_name": "Lights"
        },
        {
          "score": 0.8228058815002441,
          "bounding_box": [
            615.7774658203125,
            285.1705322265625,
            720.0,
            339.36212158203125
          ],
          "class_name": "Lights"
        },
        {
          "score": 0.7476001977920532,
          "bounding_box": [
            65.04273986816406,
            251.26344299316406,
            150.78363037109375,
            285.98223876953125
          ],
          "class_name": "Lights"
        },
        {
          "score": 0.6294553279876709,
          "bounding_box": [
            15.825980186462402,
            316.6175537109375,
            313.1271667480469,
            477.0367736816406
          ],
          "class_name": "Lights"
        },
        {
          "score": 0.5160617828369141,
          "bounding_box": [
            428.83331298828125,
            293.5417785644531,
            701.7984619140625,
            476.6263122558594
          ],
          "class_name": "Lights"
        }
      ]
    },
    {
      category: "Lawn",
      data: [
        {
          "score": 0.6245208978652954,
          "bounding_box": [
            331.0813293457031,
            154.59365844726562,
            352.3161315917969,
            193.27923583984375
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.5121493339538574,
          "bounding_box": [
            174.80853271484375,
            179.3895721435547,
            200.9495086669922,
            217.42449951171875
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.7396559119224548,
          "bounding_box": [
            241.00436401367188,
            161.8594970703125,
            286.1262512207031,
            207.048828125
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.7095217704772949,
          "bounding_box": [
            328.2857360839844,
            218.084228515625,
            346.1073913574219,
            284.05224609375
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.6540665626525879,
          "bounding_box": [
            331.63623046875,
            150.28558349609375,
            351.2783203125,
            199.74562072753906
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.5854578018188477,
          "bounding_box": [
            253.89306640625,
            237.97021484375,
            276.6549377441406,
            294.3584289550781
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.541395902633667,
          "bounding_box": [
            178.41746520996094,
            170.84317016601562,
            200.64291381835938,
            222.47409057617188
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.6914768218994141,
          "bounding_box": [
            246.9478302001953,
            155.69149780273438,
            286.93121337890625,
            202.0889892578125
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.6710044145584106,
          "bounding_box": [
            328.7914733886719,
            211.47186279296875,
            354.98748779296875,
            279.1975402832031
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.6525390148162842,
          "bounding_box": [
            177.4464111328125,
            173.301025390625,
            201.74159240722656,
            220.1595458984375
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.6312309503555298,
          "bounding_box": [
            331.350830078125,
            149.5186767578125,
            354.2351989746094,
            195.87318420410156
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.5537038445472717,
          "bounding_box": [
            253.4608917236328,
            237.24606323242188,
            278.7721252441406,
            287.1168518066406
          ],
          "class_name": "Lawn"
        },
        {
          "score": 0.5365632176399231,
          "bounding_box": [
            326.8569030761719,
            214.9936981201172,
            357.3502502441406,
            280.6205749511719
          ],
          "class_name": "Lawn"
        }
      ]
    }
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private sessionStorageService: SessionStorageService
  ) {
    this.webScrapingForm = this.fb.group({
      numOfImages: '',
      county: '',
      Website: ''
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.inspectionName = params.get('inspectionName') || '';
      this.loadModelsFromSessionStorage();
    });
  }

  loadModelsFromSessionStorage(): void {
    const savedModels = this.sessionStorageService.getItem('Models');
    if (savedModels) {
      try {
        this.models = JSON.parse(savedModels);
        this.findModel();
      } catch (error) {
        console.error('Error parsing models from sessionStorage:', error);
      }
    } else {
      console.error('No models found in sessionStorage.');
    }
  }

  findModel(): void {
    this.model = this.models.find(m => m.inspectionName.toLowerCase() === this.inspectionName.toLowerCase());
    if (this.model) {
      console.log('Model found:', this.model);
    } else {
      console.error('Model not found for inspection name:', this.inspectionName);
    }
  }

  onSubmit(): void {
    this.http.post<any>('https://localhost:5002', this.webScrapingForm.value)
      .subscribe({
        next: (response) => {
          this.inspectionData = response;
        },
        error: (error) => {
          console.error('Error:', error);
        }
      });
  }
}
